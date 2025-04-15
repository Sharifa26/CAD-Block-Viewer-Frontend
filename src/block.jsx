import React, { useEffect, useState } from "react";
import axios from "axios";

const BlockPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [expandedBlockId, setExpandedBlockId] = useState(null);

  const API_BASE_URL = "http://localhost:4000"; // You can move this to a config file if needed

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/blocks`)
      .then((res) => {
        setBlocks(res.data.rows);
      })
      .catch((err) => {
        console.error("Error fetching blocks:", err);
      });
  }, []);

  const toggleBlock = (id) => {
    setExpandedBlockId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        fontFamily: "'Raleway', sans-serif",
        color: "#000000",
      }}
    >
      <h1
        style={{
          fontSize: "2.2rem",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        🔍 All Available Blocks
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {blocks.map((block) => {
          const isOpen = expandedBlockId === block.id;
          return (
            <div
              key={block.id}
              style={{
                borderRadius: "16px",
                background: "#BBBDBC",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
                transition: "transform 0.3s ease",
                transform: isOpen ? "scale(1.01)" : "scale(1)",
              }}
            >
              {/* Header Section */}
              <div
                onClick={() => toggleBlock(block.id)}
                style={{
                  padding: "20px 25px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: isOpen ? "#245F73" : "#F2F0EF",
                  cursor: "pointer",
                  borderBottom: `2px solid ${isOpen ? "#733E24" : "#BBBDBC"}`,
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#000000",
                    }}
                  >
                    🧩 {block.block_name}{" "}
                    <span
                      style={{
                        fontSize: "1rem",
                        color: "#000000",
                      }}
                    >
                      ({block.block_type})
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "#000000",
                      marginTop: "5px",
                    }}
                  >
                    📦 Block ID: <strong>{block.id}</strong> &nbsp;|&nbsp; 🗂
                    File ID: <strong>{block.file_id}</strong> &nbsp;|&nbsp; 📁
                    File Name: <strong>SampleFile.dxf</strong>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    color: "#733E24",
                    transition: "transform 0.3s ease",
                  }}
                >
                  {isOpen ? "▲" : "▼"}
                </div>
              </div>

              {/* Expandable Content */}
              {isOpen && (
                <div
                  style={{
                    padding: "20px 30px",
                    animation: "fadeIn 0.3s ease",
                    background: "#F2F0EF",
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    color: "#000000",
                  }}
                >
                  <p>
                    <strong>📌 Layer:</strong> {block.properties.layer}
                  </p>
                  <p>
                    <strong>🔑 Handle:</strong> {block.properties.handle}
                  </p>
                  <p>
                    <strong>📍 Coordinates:</strong> ({block.x_coordinate},{" "}
                    {block.y_coordinate}, {block.z_coordinate})
                  </p>
                  <p>
                    <strong>🧮 Control Points:</strong>
                  </p>
                  <ul style={{ paddingLeft: "20px", listStyleType: "circle" }}>
                    {block.properties.controlPoints.map((pt, idx) => (
                      <li key={idx} style={{ marginBottom: "4px" }}>
                        ({pt.x}, {pt.y}, {pt.z})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlockPage;
