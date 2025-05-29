export default function Maps() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=-8.041992187500002%2C32.89803818160524%2C5.273437500000001%2C46.437856895024204&amp;layer=mapnik"
        width="100%"
        height="400"
        style={{ border: '0' }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
}



