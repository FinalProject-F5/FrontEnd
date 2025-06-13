const data = new FormData();
data.append("experienceName", formData.experienceName);
data.append("location", formData.location);
data.append("category", formData.category);
data.append("description", formData.description);
data.append("duration", formData.duration);
data.append("cost", formData.cost);
data.append("itinerary", formData.itinerary);
data.append("observations", formData.observations);
data.append("hostName", formData.hostName);
data.append("hostEmail", formData.hostEmail);
data.append("phone", formData.phone);

if (formData.images && formData.images.length > 0) {
  for (let i = 0; i < formData.images.length; i++) {
    data.append("images", formData.images[i]);
  }
}
