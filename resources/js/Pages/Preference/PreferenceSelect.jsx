import React from "react";
import Dropdown from "react-dropdown-select";

export default function PreferenceSelect({
    title,
    items,
    selectedValues,
    onChange,
}) {
    return (
        <div className="mt-4">
            <h3 className="text-lg">{title} :</h3>
            <Dropdown
                options={items.map((item) => ({ label: item, value: item }))}
                values={selectedValues.map((item) => ({
                    label: item,
                    value: item,
                }))}
                onChange={(values) =>
                    onChange(values.map((item) => item.value))
                }
                multi
            />
            <hr />
        </div>
    );
}
