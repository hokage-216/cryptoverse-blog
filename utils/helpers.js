module.exports = {
  format_date: function (date, format) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Default format
    return new Date(date).toLocaleDateString('en-US', format ? format : options);
  },
};