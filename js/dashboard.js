const tbody = document.getElementById('tbody');
const filterseat = document.getElementById('filterseat');
const agesort = document.getElementById('agesort');
const datesort = document.getElementById('datesort');

let registrarData =
  JSON.parse(localStorage.getItem('registrar')) || new Array();

window.addEventListener('load', () => {
  let registrarData =
    JSON.parse(localStorage.getItem('registrar')) || new Array();

  getData(registrarData);
});

// getData
const getData = (registrarData) => {
  tbody.innerHTML = null;

  registrarData?.forEach((item) => {
    tbody.append(
      getCard(
        item.id,
        item.name,
        item.age,
        item.fstation,
        item.tstation,
        item.date,
        item.seat
      )
    );
  });
};

// getCard
const getCard = (id, name, age, fstation, tstation, date, seat) => {
  let tr = document.createElement('tr');

  let idx = document.createElement('td');
  idx.innerText = id;

  let namex = document.createElement('td');
  namex.innerText = name;

  let agex = document.createElement('td');
  agex.innerText = age;

  let fstationx = document.createElement('td');
  fstationx.innerText = fstation;

  let tstationx = document.createElement('td');
  tstationx.innerText = tstation;

  let datex = document.createElement('td');
  datex.innerText = date;

  let seatx = document.createElement('td');
  seatx.innerText = seat;

  let otpx = document.createElement('td');
  otpx.innerText = otp();

  let rejectx = document.createElement('td');
  rejectx.innerText = 'Reject';
  rejectx.style.color = 'red';
  rejectx.style.cursor = 'pointer';
  rejectx.addEventListener('click', () => {
    let registrarData =
      JSON.parse(localStorage.getItem('registrar')) || new Array();

    let registrarDatax = registrarData?.filter((item) => item.id != id);

    localStorage.setItem('registrar', JSON.stringify(registrarDatax));
    alert('Booking Rejected Successfull');
    getData(registrarDatax);
  });

  let confirmx = document.createElement('td');
  confirmx.innerText = 'Confirm';
  confirmx.style.color = 'green';
  confirmx.style.cursor = 'pointer';
  confirmx.addEventListener('click', () => {
    let otpValue = prompt('Please Enter OTP for Booking');
    let registrarData =
      JSON.parse(localStorage.getItem('registrar')) || new Array();

    let otpArr = JSON.parse(localStorage.getItem('otp')) || new Array();
  });

  tr.append(
    idx,
    namex,
    agex,
    fstationx,
    tstationx,
    datex,
    seatx,
    otpx,
    rejectx,
    confirmx
  );

  return tr;
};

// otp
const otp = () => {
  let randomNum = Math.floor(1000 + Math.random() * 9000);

  toString(randomNum);

  let otpArr = JSON.parse(localStorage.getItem('otp')) || new Array();
  let otpArrx = [...otpArr, randomNum];

  localStorage.setItem('otp', JSON.stringify(otpArrx));

  return randomNum;
};

// filter
filterseat.addEventListener('change', () => {
  let filterseatValue = filterseat.value;

  let registrarDatax =
    JSON.parse(localStorage.getItem('registrar')) || new Array();

  let filterSeatRegistrarData = registrarData?.filter(
    (item) => item.seat == filterseatValue
  );

  registrarData = filterSeatRegistrarData;

  if (!registrarData.length) {
    registrarData = registrarDatax;
    getData(registrarDatax);
    return;
  }
  getData(registrarData);
});

// sort by age
agesort.addEventListener('change', () => {
  let agesortValue = agesort.value;

  // let registrarData =
  //   JSON.parse(localStorage.getItem('registrar')) || new Array();

  let sortAgeRegistrarData =
    agesortValue == 'asc'
      ? sortAscFunc(registrarData, 'age')
      : sortDescFunc(registrarData, 'age');

  registrarData = sortAgeRegistrarData;

  getData(registrarData);
});

// sort by date
datesort.addEventListener('change', () => {
  let datesortValue = datesort.value;

  // let registrarData =
  //   JSON.parse(localStorage.getItem('registrar')) || new Array();

  let sortDateRegistrarData =
    datesortValue == 'asc'
      ? sortAscFunc(registrarData, 'date')
      : sortDescFunc(registrarData, 'date');

  registrarData = sortDateRegistrarData;

  getData(registrarData);
});

// sortAscFunc
function sortAscFunc(registrarData, condition) {
  let n = registrarData.length;

  for (let i = 0; i <= n - 2; i++) {
    let flag = false;
    for (let j = 0; j <= n - i - 2; j++) {
      if (registrarData[j][condition] > registrarData[j + 1][condition]) {
        flag = true;
        tmp = registrarData[j];
        registrarData[j] = registrarData[j + 1];
        registrarData[j + 1] = tmp;
      }
    }
    if (flag == false) {
      break;
    }
  }

  return registrarData;
}

// sortDescFunc
function sortDescFunc(registrarData, condition) {
  let n = registrarData.length;

  for (let i = 0; i <= n - 2; i++) {
    let flag = false;
    for (let j = 0; j <= n - i - 2; j++) {
      if (registrarData[j][condition] < registrarData[j + 1][condition]) {
        flag = true;
        tmp = registrarData[j];
        registrarData[j] = registrarData[j + 1];
        registrarData[j + 1] = tmp;
      }
    }
    if (flag == false) {
      break;
    }
  }

  return registrarData;
}
