import React, { useState } from "react";
import "./search.css";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/blocks/search/${query}`);
      const data = await res.json();
      setBlocks(data);
      setExpandedIndex(null); // reset expansion
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-bar-wrapper">
            <input
              className="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search block name..."
            />
            <button type="submit" className="search-button">
              🔍
            </button>
          </div>
        </form>

        {loading && <p>Loading...</p>}

        {blocks.length === 0 && !loading && (
          <p className="found">No results found.</p>
        )}

        {/* Expandable Block Cards */}
        {blocks.map((block, index) => (
          <div
            key={index}
            className={`block-card ${
              expandedIndex === index ? "expanded" : ""
            }`}
            onClick={() => toggleExpand(index)}
          >
            <div className="block-header">
              <h2 className="block-title">🧩 {block.block_name}</h2>
              <button className="expand-btn">
                {expandedIndex === index ? "▲" : "▼"}
              </button>
            </div>

            {expandedIndex === index && (
              <div className="block-details">
                <p>
                  <strong>Type:</strong> {block.block_type}
                </p>
                <p>
                  <strong>Coordinates:</strong> ({block.x_coordinate},{" "}
                  {block.y_coordinate}, {block.z_coordinate})
                </p>
                <p>
                  <strong>Layer:</strong> {block.properties?.layer}
                </p>
                <p>
                  <strong>Handle:</strong> {block.properties?.handle}
                </p>

                <div className="control-points">
                  <strong>Control Points:</strong>
                  <ul>
                    {block.properties?.controlPoints?.map((pt, idx) => (
                      <li key={idx}>
                        ({pt.x}, {pt.y}, {pt.z})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
