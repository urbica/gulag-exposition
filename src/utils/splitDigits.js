export default digit =>
  String(digit).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
