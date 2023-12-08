import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const AddProduct = () => {
  //   const object = [
  //     { id: 1, variants: [{ size: "X" }, { length: 45 }], quantity: 2 },
  //     { id: 1, variants: [{ size: "X" }, { length: 45 }], quantity: 2 },
  //   ];
  //   console.log(object);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [variants, setVariants] = useState([{ name: "", values: [] }]);
  const [images, setImages] = useState([]);

  const handleAddVariant = () => {
    setVariants([...variants, { name: "", values: [] }]);
  };

  const handleRemoveVariant = (index) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  const handleAddValue = (index) => {
    const newVariants = [...variants];
    newVariants[index].values.push("");
    setVariants(newVariants);
  };

  const handleRemoveValue = (variantIndex, valueIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].values.splice(valueIndex, 1);
    setVariants(newVariants);
  };

  const handleValueChange = (variantIndex, valueIndex, newValue) => {
    const newVariants = [...variants];
    newVariants[variantIndex].values[valueIndex] = newValue;
    setVariants(newVariants);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setImages(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      multiple: true,
      accept: "image/*",
    });

  useEffect(() => {
    if (fileRejections.length > 0) {
      alert(
        "One or more files is not an image. Please select only image files."
      );
    }
  }, [fileRejections]);

  const handleSubmit = () => {
    const data = {
      productName,
      productDescription,
      productPrice,
      variants,
      images,
    };
    console.log(data);
  };

  return (
    <div className="add-product container">
      <h1>Add a product</h1>
      <label>
        Product Name:
        <input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </label>
      <label>
        Product Description:
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
      </label>
      <label>
        Product Price:
        <input
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </label>
      <div>
        <label>
          Product Images:
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the images here...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
        </label>
        <aside>
          <h4>Files:</h4>
          <ul>
            {images.map((image) => (
              <li key={image.name}>{image.name}</li>
            ))}
          </ul>
        </aside>
      </div>
      {variants.map((variant, index) => (
        <div key={index}>
          <label>
            Variant Name:
            <input
              value={variant.name}
              onChange={(e) =>
                setVariants(
                  variants.map((variant, i) =>
                    i === index
                      ? { name: e.target.value, values: variant.values }
                      : variant
                  )
                )
              }
            />
          </label>
          {variant.values.map((value, valueIndex) => (
            <div key={valueIndex}>
              <label>
                Value:
                <input
                  value={value}
                  onChange={(e) =>
                    handleValueChange(index, valueIndex, e.target.value)
                  }
                />
              </label>
              <button onClick={() => handleRemoveValue(index, valueIndex)}>
                Remove Value
              </button>
            </div>
          ))}
          <button onClick={() => handleAddValue(index)}>Add Value</button>
          <button onClick={() => handleRemoveVariant(index)}>
            Remove Variant
          </button>
        </div>
      ))}
      <button onClick={() => handleAddVariant()}>Add Variant</button>
      <button onClick={() => handleSubmit()}>Add product</button>
    </div>
  );
};

export default AddProduct;
