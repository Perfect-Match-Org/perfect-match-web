import React from "react";

const MCTForm = ({ data, item }: any) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <div className="w-1/3">
      <h2 className="text-3xl p-4">{item}</h2>
      <div className="p-4">
        <label className="block">Relationship</label>
        <input
          type="number"
          name={item + " Calories"}
          className="bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          onChange={(e) => onChange(e)}
        ></input>
      </div>
      <div className="p-4">
        <label className="block">Crushes</label>
        <input
          type="number"
          name={item + " Carbs"}
          className="bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          onChange={(e) => onChange(e)}
        ></input>
      </div>
      <div className="p-4">
        <label className="block">Interests</label>
        <input
          type="text"
          name={item + " Fat"}
          className="bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          onChange={(e) => onChange(e)}
        ></input>
      </div>
      <div className="p-4">
        <label className="block">School</label>
        <input
          type="text"
          name={item + " Protein"}
          className="bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          onChange={(e) => onChange(e)}
        ></input>
      </div>
    </div>
  );
};

export default MCTForm;
