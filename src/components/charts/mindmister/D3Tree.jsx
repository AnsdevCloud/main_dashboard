// InteractiveTree.js
import React, { useState, useCallback, useRef, useEffect } from "react";
import Tree from "react-d3-tree";
import {
  Box,
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  IconButton,
  Tooltip,
  Alert,
  Stack,
} from "@mui/material";
import { ArrowBack, Save, Update } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// --- Constants and Helpers ---

// Initial tree data as a hierarchical object.
const initialTreeData = {
  name: "Main",
  id: 0,
  attributes: {},
  bgColor: "#fca776",
  children: [],
};

// Relationship mapping: category => list of types.
const RS_OPTIONS = {
  spouse: ["wife", "husband"],
  children: [
    "son",
    "daughter",
    "grand son",
    "grand daughter",
    "son in law",
    "daughter in law",
  ],
  siblings: ["brother", "sister"],
  parents: ["father", "mother", "father in law", "mother in law"],
  "grand parents": ["grand father", "grand mother"],
  group: ["Contact Person", "Director", "Chief Experience Officer"],
};

// Use structuredClone if available.
const deepClone = (obj) =>
  typeof structuredClone === "function"
    ? structuredClone(obj)
    : JSON.parse(JSON.stringify(obj));

/**
 * Helper: recursively traverse the tree along the last child branch
 * to get the id of the last node. If a node's id is null, it defaults to 0.
 */
const getLastNodeId = (node) => {
  const currentId = node.id != null ? node.id : 0;
  if (node.children && node.children.length > 0) {
    return getLastNodeId(node.children[node.children.length - 1]);
  }
  return currentId;
};

// Pure recursive function to remove a node by id.
const removeNodeById = (node, targetId) => {
  if (!node.children) return node;
  return {
    ...node,
    children: node.children
      .filter((child) => child.id !== targetId)
      .map((child) => removeNodeById(child, targetId)),
  };
};

// Pure recursive function to update a node's data by id.
const updateNodeById = (node, targetId, newData) => {
  if (node.id === targetId) {
    return {
      ...node,
      name: newData.name,
      attributes: {
        ...node.attributes,
        relationshipCategory: newData.relationshipCategory,
        relationshipType: newData.relationshipType,
        dob: newData.dob,
      },
    };
  }
  if (node.children) {
    return {
      ...node,
      children: node.children.map((child) =>
        updateNodeById(child, targetId, newData)
      ),
    };
  }
  return node;
};

// Pure recursive function to add a child to a node by id.
// The new child's order is determined by counting existing children in the same category.
const addChildToNode = (node, targetId, newChild, relationshipCategory) => {
  let min = generateRandomId();

  if (node.id === targetId) {
    const sameCategoryCount = node.children
      ? node.children.filter(
          (child) =>
            child.attributes.relationshipCategory === relationshipCategory
        ).length
      : 0;
    const childWithAttributes = {
      ...newChild,
      attributes: {
        ...newChild.attributes,
        relationshipCategory,
        relationshipType: newChild.attributes.relationshipType,
        dob: newChild.attributes.dob,
        min: min,
        order: sameCategoryCount + 1,
      },
    };
    return {
      ...node,
      children: [...(node.children || []), childWithAttributes],
    };
  }
  if (node.children) {
    return {
      ...node,
      children: node.children.map((child) =>
        addChildToNode(child, targetId, newChild, relationshipCategory)
      ),
    };
  }
  return node;
};

// Calculate age from a date string.
const calculateAge = (birthDateString) => {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }
  if (days < 0) {
    months--;
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += previousMonth.getDate();
  }
  return { years, months, days };
};

// Centralized age validation for specific relationship categories.
const validateAge = (category, dob) => {
  if (!dob) return { status: false, type: "", msg: "" };
  const age = calculateAge(dob).years;
  let msg = "";
  let type = "error";

  switch (category) {
    case "spouse":
      if (age < 18) {
        msg = `Age not valid: ${age}`;
      } else {
        type = "success";
        msg = `Age valid: ${age}`;
      }
      break;
    case "parents":
      if (age < 18 || age >= 120) {
        msg = `Age not valid: ${age}`;
      } else {
        type = "success";
        msg = `Age valid: ${age}`;
      }
      break;
    case "grand parents":
      // Require an additional 18 years difference.
      if (age - 18 < 18 || age > 110) {
        msg = `Age not valid: ${age}`;
      } else {
        type = "success";
        msg = `Age valid: ${age}`;
      }
      break;
    default:
      break;
  }
  return { status: Boolean(msg), type, msg };
};

// --- Custom Node Component ---

const CustomNode = ({ nodeDatum, onDoubleClick, toggleNode }) => {
  const clickTimeoutRef = useRef(null);
  const DOUBLE_CLICK_THRESHOLD = 300; // milliseconds

  const handleClick = (e) => {
    e.stopPropagation();
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      onDoubleClick(e, nodeDatum);
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        toggleNode();
        clickTimeoutRef.current = null;
      }, DOUBLE_CLICK_THRESHOLD);
    }
  };

  const boxWidth = 200;
  const boxHeight = 55;
  const backgroundColor = nodeDatum?.bgColor || "#ffffff";
  const displayName =
    nodeDatum?.name?.length > 20
      ? nodeDatum.name.slice(0, 20) + "..."
      : nodeDatum.name;

  return (
    <g onClick={handleClick} style={{ cursor: "pointer" }}>
      <foreignObject
        x={-boxWidth / 2}
        y={0}
        width={boxWidth}
        height={boxHeight}
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          title="Double Click Add Member"
          style={{
            width: boxWidth,
            height: boxHeight,
            backgroundColor,
            border: "1px solid #ccc",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#282424",
            textAlign: "center",
            cursor: "pointer",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              textAlign: "left",
              lineHeight: 1.2,
              marginBottom: "0.5em",
            }}
          >
            {displayName}
          </div>
          <div
            style={{
              fontSize: "12px",
              lineHeight: 1.2,
              letterSpacing: 1,
              textTransform: "capitalize",
            }}
          >
            {nodeDatum.attributes?.relationshipType}{" "}
            {nodeDatum.attributes?.email}{" "}
            {nodeDatum.attributes?.dob &&
              `- Age ${calculateAge(nodeDatum.attributes.dob).years} `}
          </div>
        </div>
      </foreignObject>
    </g>
  );
};

// --- Main Component ---

const InteractiveTree = () => {
  const [treeData, setTreeData] = useState(initialTreeData);
  const clintType = JSON.parse(sessionStorage.getItem("ct"));
  const MainClient = JSON.parse(sessionStorage.getItem("ctn"));

  const [isMIN, setIsMIN] = useState(null);
  const [toolbar, setToolbar] = useState(null); // { node, x, y }
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState(null); // { mode: "add" | "update", node }
  const [nameField, setNameField] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [dob, setDob] = useState("");
  const [relationshipCategory, setRelationshipCategory] = useState(
    Object.keys(RS_OPTIONS)[0]
  );
  const [relationshipType, setRelationshipType] = useState(
    RS_OPTIONS[Object.keys(RS_OPTIONS)[0]][0]
  );
  const [nextId, setNextId] = useState(1);
  const [isMessage, setIsMessage] = useState({
    msg: "",
    type: "",
    status: false,
  });

  // Load tree from sessionStorage once on mount.
  useEffect(() => {
    const storedTree = sessionStorage.getItem("tre");

    if (storedTree) {
      try {
        const parsedTree = JSON.parse(storedTree);
        if (parsedTree?.children?.length > 0) {
          setTreeData({
            ...parsedTree,
            name: MainClient?.name,
            attributes: {
              ...parsedTree.attributes,
              relationshipType: "Self",
              dob: MainClient?.dob,
              gender: MainClient?.gender,
            },
          });
        }
      } catch (err) {
        console.error("Error parsing stored tree data", err);
      }
    }
  }, []);

  // Save treeData to sessionStorage when it changes.
  useEffect(() => {
    if (treeData?.children?.length > 0) {
      sessionStorage.setItem("tre", JSON.stringify(treeData));
    }
  }, [treeData]);

  // Automatically update nextId based on the last node in the tree.
  useEffect(() => {
    const lastId = getLastNodeId(treeData);
    setNextId(lastId + 1);
  }, [treeData]);

  // Update age validation message when dob or relationshipCategory changes.
  useEffect(() => {
    setIsMessage(validateAge(relationshipCategory, dob));
  }, [relationshipCategory, dob]);

  const toggleCollapse = useCallback(
    (e, nodeDatum) => {
      const newTree = deepClone(treeData);
      const toggleNode = (node) => {
        if (node.id === nodeDatum.id) {
          if (node.children) {
            node._children = node.children;
            node.children = undefined;
          } else if (node._children) {
            node.children = node._children;
            node._children = undefined;
          }
        } else if (node.children) {
          node.children.forEach((child) => toggleNode(child));
        }
      };
      toggleNode(newTree);
      setTreeData(newTree);
    },
    [treeData]
  );

  const handleDoubleClick = useCallback((event, nodeDatum) => {
    setToolbar({ node: nodeDatum, x: event.clientX, y: event.clientY });
    setForm(null);
  }, []);

  const hideToolbar = () => {
    setToolbar(null);
    setForm(null);
  };

  const handleToolbarAction = (action) => {
    if (action === "delete") {
      if (toolbar.node.id === 0) {
        alert("Cannot delete the root node.");
      } else {
        const newTree = removeNodeById(deepClone(treeData), toolbar.node.id);
        setTreeData(newTree);
        sessionStorage.setItem("tre", JSON.stringify(newTree));
      }
      hideToolbar();
    } else if (action === "update") {
      setForm({ mode: "update", node: toolbar.node });
      setNameField(toolbar.node.name);
      setDob(toolbar.node.attributes?.dob || "");
      setIsMIN(toolbar.node.attributes?.min);
      setEmail(toolbar.node.attributes?.email || "");
      setDesignation(toolbar.node.attributes?.designation || "");
      setContactNum(toolbar.node.attributes?.phoneNum || "");
      setRelationshipCategory(
        toolbar.node.attributes?.relationshipCategory || clintType === "group"
          ? Object.keys(RS_OPTIONS)[5]
          : Object.keys(RS_OPTIONS)[0]
      );
      setRelationshipType(
        toolbar.node.attributes?.relationshipType || clintType === "group"
          ? RS_OPTIONS[Object.keys(RS_OPTIONS)[5]][0]
          : RS_OPTIONS[Object.keys(RS_OPTIONS)[0]][0]
      );
    } else if (action === "add") {
      setForm({ mode: "add", node: toolbar.node });
      setNameField("");
      setIsMIN("");
      setDob("");
      setEmail("");
      setDesignation("");
      setContactNum("");
      setRelationshipCategory(
        clintType === "group"
          ? Object.keys(RS_OPTIONS)[5]
          : Object.keys(RS_OPTIONS)[0]
      );
      setRelationshipType(
        clintType === "group"
          ? RS_OPTIONS[Object.keys(RS_OPTIONS)[5]][0]
          : RS_OPTIONS[Object.keys(RS_OPTIONS)[0]][0]
      );
    }
  };

  const handleFormSubmit = () => {
    if (!nameField.trim() || !relationshipCategory || !relationshipType) {
      setIsMessage({
        type: "error",
        status: true,
        msg: "Please fill in all fields.",
      });
      return;
    }
    let newTree = deepClone(treeData);
    if (form.mode === "update") {
      newTree = updateNodeById(newTree, form.node.id, {
        name: nameField,
        relationshipCategory,
        relationshipType,
        dob,
        designation,
        email,
        phoneNum: contactNum,
      });
    } else if (form.mode === "add") {
      const newChild = {
        name: nameField,
        id: nextId,
        attributes: {
          relationshipType,
          dob,
          designation,
          email,
          phoneNum: contactNum,
        },
        children: [],
      };
      newTree = addChildToNode(
        newTree,
        form.node.id,
        newChild,
        relationshipCategory
      );
      sessionStorage.setItem("min", JSON.stringify(""));
      // nextId will update automatically based on the updated tree.
    }
    setTreeData(newTree);
    hideToolbar();
  };

  const handleFormCancel = () => setForm(null);

  const renderCustomNode = (rd3tProps) => (
    <CustomNode
      {...rd3tProps}
      onDoubleClick={handleDoubleClick}
      toggleNode={() => toggleCollapse(null, rd3tProps.nodeDatum)}
    />
  );

  const cid = JSON.parse(sessionStorage.getItem("cid"));

  // Load edit data if available.
  useEffect(() => {
    const editData = JSON.parse(sessionStorage.getItem("edit-data"));
    if (editData?.id) {
      setEdit(true);
      if (editData?.members) {
        setTreeData(editData.members);
      }
    }
  }, []);

  const handleSubmit = async () => {
    if (treeData.children.length === 0) {
      alert("Empty Members");
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ members: { ...treeData } });
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
    };

    try {
      const response = await fetch(
        `https://db.enivesh.com/firestore/single/crm_clients/${cid}`,
        requestOptions
      );
      await response.text();
      alert(edit ? "Updated" : "Added");
      setTreeData(initialTreeData);
      navigate("/crm/bank");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ width: "100%", height: "100vh", position: "relative" }}
      onClick={hideToolbar}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "#6e6e6e91",
          zIndex: 20,
          display: cid ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ p: 1, width: 300 }}>
          <Alert severity="error">CIN not set</Alert>
          <Button
            fullWidth
            color="success"
            variant="outlined"
            onClick={() => navigate("/crm/parsonal")}
            sx={{ my: 2 }}
          >
            Set CIN
          </Button>
        </Paper>
      </Box>
      <Paper
        elevation={5}
        sx={{
          p: 1,
          position: "absolute",
          width: 200,
          top: 10,
          left: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Tooltip title="Back">
          <IconButton onClick={() => navigate(-1)} size="small">
            <ArrowBack fontSize="10px" />
          </IconButton>
        </Tooltip>
        <Button
          color="info"
          size="small"
          variant="contained"
          onClick={handleSubmit}
          startIcon={edit ? <Update /> : <Save />}
        >
          {edit ? "Update" : "Save"}
        </Button>
      </Paper>
      <Paper
        elevation={5}
        sx={{
          p: 1,
          position: "absolute",
          width: 200,
          top: 10,
          right: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Typography
          fontWeight={600}
          textTransform={"uppercase"}
          variant="subtitle1"
          component="h1"
        >
          Family Tree
        </Typography>
      </Paper>
      <div id="treeWrapper" style={{ width: "100%", height: "100%" }}>
        <Tree
          data={treeData}
          orientation="vertical"
          renderCustomNodeElement={renderCustomNode}
          pathFunc="diagonal"
          nodeSize={{ x: 200, y: 200 }}
          separation={{ siblings: 1.5, nonSiblings: 0.9 }}
          translate={{ x: 700, y: 50 }}
          draggable
          zoom={0.6}
          zoomable
          collapsible={true}
          enableLegacyTransitions
          dimensions={{ height: 350, width: 1440 }}
          centeringTransitionDuration={1000}
        />
      </div>

      {/* Inline Toolbar */}
      {toolbar && !form && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            left: toolbar.x,
            top: toolbar.y,
            p: 1,
            display: "flex",
            gap: 1,
            zIndex: 10,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => handleToolbarAction("add")}
          >
            Add Member
          </Button>
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={() => handleToolbarAction("update")}
          >
            Update Member
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleToolbarAction("delete")}
          >
            Delete Member
          </Button>
          <Button
            variant="text"
            color="inherit"
            size="small"
            onClick={hideToolbar}
          >
            Cancel
          </Button>
        </Paper>
      )}

      {/* Inline Form for Add/Update */}
      {form && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            left: toolbar ? toolbar.x : 0,
            top: toolbar ? toolbar.y : 0,
            p: 2,
            width: 320,
            zIndex: 10,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Member Name"
              value={nameField}
              onChange={(e) => setNameField(e.target.value)}
            />
          </Box>
          {clintType !== "group" && (
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                type="date"
                variant="outlined"
                size="small"
                label="Date of Birth"
                slotProps={{ inputLabel: { shrink: true } }}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </Box>
          )}
          {clintType === "group" && (
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                size="small"
                label="Designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </Box>
          )}
          {clintType === "group" && (
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                type="email"
                variant="outlined"
                size="small"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
          )}
          {clintType === "group" && (
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                type="number"
                variant="outlined"
                size="small"
                label="Contact"
                value={contactNum}
                onChange={(e) => setContactNum(e.target.value)}
              />
            </Box>
          )}
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: 14 }}>
                Relationship Category
              </InputLabel>
              <Select
                value={relationshipCategory}
                label="Relationship Category"
                sx={{ fontSize: 14, textTransform: "capitalize" }}
                onChange={(e) => {
                  const cat = e.target.value;
                  setRelationshipCategory(cat);
                  setRelationshipType(RS_OPTIONS[cat][0]);
                }}
              >
                {Object.keys(RS_OPTIONS).map((cat) => (
                  <MenuItem
                    key={cat}
                    value={cat}
                    disabled={
                      clintType === "group"
                        ? cat === "group"
                          ? false
                          : true
                        : cat === "group"
                        ? true
                        : false
                    }
                    sx={{ fontSize: 14, textTransform: "capitalize" }}
                  >
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: 14, textTransform: "capitalize" }}>
                Relationship Type
              </InputLabel>
              <Select
                value={relationshipType}
                label="Relationship Type"
                sx={{ fontSize: 14, textTransform: "capitalize" }}
                onChange={(e) => setRelationshipType(e.target.value)}
              >
                {RS_OPTIONS[relationshipCategory].map((rel) => (
                  <MenuItem
                    key={rel}
                    value={rel}
                    sx={{ fontSize: 14, textTransform: "capitalize" }}
                  >
                    {rel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
              width: "100%",
            }}
          >
            {isMessage.status && (
              <Typography
                fontWeight={600}
                color={isMessage.type}
                fontSize={8}
                component="p"
              >
                {isMessage.msg}
              </Typography>
            )}
            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              {isMIN && (
                <Typography
                  variant="caption"
                  component={"p"}
                  textAlign={"left"}
                >
                  {" "}
                  MIN : {isMIN}
                </Typography>
              )}
              <Button
                color={form.mode === "update" ? "info" : "primary"}
                variant="contained"
                onClick={handleFormSubmit}
              >
                {form.mode === "update" ? "Update" : "Save"}
              </Button>
              <Button variant="text" color="inherit" onClick={handleFormCancel}>
                Cancel
              </Button>
            </Stack>
          </Box>
        </Paper>
      )}
    </div>
  );
};

export default InteractiveTree;

// Utility function to generate a random ID
function generateRandomId() {
  const chars = "0123456789abcdfghijklmnopqrstuvwxyz";
  let id = "en";
  for (let i = 1; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    id += chars[randomIndex];
  }

  return id;
}
