const data = new FormData();
data.append("title", formData.title);
data.append("location", formData.location);
data.append("category", formData.category);
data.append("description", formData.description);
data.append("duration", formData.duration);
data.append("price", formData.price);
//data.append("itinerary", formData.itinerary);
//data.append("observations", formData.observations);
data.append("host", formData.host);
data.append("email", formData.email);
data.append("mobile", formData.mobile);
data.append("addInfo", formData.addInfo);

//if (formData.images && formData.images.length > 0) {
 // for (let i = 0; i < formData.images.length; i++) {
  //  data.append("images", formData.images[i]);
  //}
//}
