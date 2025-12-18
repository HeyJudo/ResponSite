import "../CSS/LGUUpdateResourcesSection.css";

const LGUUpdateResourcesSection = () => {
  return (
    <div className="resource-forms">

      {/* Add Item */}
      <section className="form-box">
        <h3>Add Item</h3>
        <input placeholder="Item Name" />
        <input placeholder="Category" />
        <input placeholder="Quantity" />
        <input placeholder="Unit" />
        <input placeholder="Location" />
        <button>Add Item</button>
      </section>

      {/* Increase Stock */}
      <section className="form-box">
        <h3>Increase Stock</h3>
        <input placeholder="Select Item" />
        <input placeholder="Amount to Add" />
        <button>Increase</button>
      </section>

      {/* Decrease Stock */}
      <section className="form-box">
        <h3>Decrease Stock</h3>
        <input placeholder="Select Item" />
        <input placeholder="Amount to Reduce" />
        <button>Decrease</button>
      </section>

      {/* Select Item to Edit */}
      <section className="form-box">
        <h3>Select Item to Edit</h3>
        <input placeholder="Select Item" />
        <button>Select</button>
      </section>

      {/* Edit Item */}
      <section className="form-box">
        <h3>Edit Item</h3>
        <input placeholder="Item Name" />
        <input placeholder="Category" />
        <input placeholder="Unit" />
        <input placeholder="Location" />
        <button>Save Changes</button>
      </section>

    </div>
  );
};

export default LGUUpdateResourcesSection;
