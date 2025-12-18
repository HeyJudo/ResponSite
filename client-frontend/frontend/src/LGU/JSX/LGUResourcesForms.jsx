import "../CSS/LGUResourceForms.css";

const LGUResourceForms = () => {
  return (
    <div className="forms">
      <h3>Add Item</h3>
      <input placeholder="Item name" />
      <input placeholder="Category" />
      <input placeholder="Quantity" />
      <button>Submit</button>
    </div>
  );
};

export default LGUResourceForms;
