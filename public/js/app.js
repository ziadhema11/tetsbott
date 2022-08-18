let interval = setInterval(() => {
  let date;
  try {
    date = new Date(new Date('2021/11/1') - Date.now());
    let months = date.getMonth();
    let days = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let mili_seconds = date.getMilliseconds();
    var text = `Months: ${months} | Days: ${days} | Hours: ${hours}:${minutes}`;
  } catch (error) {
    clearInterval(interval);
  }
  text = text.replaceAll('\n', '<br>');
  document.getElementById('date').innerHTML = text;
}, 1);
