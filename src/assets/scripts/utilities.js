const clearUploadedFirebaseImage = (imageRef) => {
  imageRef
    .delete()
    .then(() => {
      console.log("Cleared Uploaded Image File in Firebase.");
    })
    .catch((error) => {
      console.error(error);
    });
};

export { clearUploadedFirebaseImage };
