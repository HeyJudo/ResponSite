import "../CSS/LGUResources.css";
import { resources } from "../JS/resourcesData";

const LGUResources = () => {
  return (
    <div>
      <h2>Resources</h2>
      <input placeholder="Search" />
      <button>Add Item</button>
      <button>Edit Item</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((r, index) => (
            <tr key={index}>
              <td>{r.name}</td>
              <td>{r.category}</td>
              <td>{r.quantity}</td>
              <td>{r.unit}</td>
              <td>{r.location}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LGUResources;
