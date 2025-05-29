
export default function MapComponent() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56114.89094495899!2d2.091158873878877!3d41.39623993228288!2m3!1f0!2f0!3l0!3m2!1i10!2i0!4m1!3e0!3m1!1s0x12b59918c50749e7:0x27215d0c7096c3c6!4m1!3e0"
        width="100%"
        height="400"
        style={{ border: '0' }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
}

