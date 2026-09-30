const SimpleMap = () => {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-card border border-line bg-canvas">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155.3107414555592!2d0.3225797117627375!3d51.4770307641742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8b792e960dbdb%3A0x19994416c2535aa9!2sMTA%20worldwide%20Currency%20Exchange%20%26%20Money%20Transfer!5e0!3m2!1sen!2s!4v1769934282783!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="MTA Currency Exchange - Google Maps"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
};

export default SimpleMap;
