const registrar = document.getElementById('registrar');

registrar.addEventListener('submit', (e) => {
  e.preventDefault();

  let id = registrar.id.value;
  let name = registrar.name.value;
  let age = registrar.age.value;
  let fstation = registrar.fstation.value;
  let tstation = registrar.tstation.value;
  let date = registrar.date.value;
  let seat = registrar.seat.value;

  if (!id || !name || !age || !fstation || !tstation || !date || !seat) {
    alert('Please Fill Empty Section');
    return;
  }

  if (name.length <= 4) {
    alert('Name must be have 4 character');
    return;
  }

  if (age < 18 || age > 40) {
    alert('Age must be between 18 to 40');
    return;
  }

  if (fstation === tstation) {
    alert('From-station should be different to To-station');
    return;
  }

  let registrarInfo = {
    id,
    name,
    age,
    fstation,
    tstation,
    date,
    seat,
  };

  if (id && name && age && fstation && tstation && date && seat) {
    registrarFunc(registrarInfo);
  }
});

// registrarFunc
const registrarFunc = (registrarInfo) => {
  let registrarData =
    JSON.parse(localStorage.getItem('registrar')) || new Array();

  let uniqueIDCheck = registrarData?.find(
    (item) => item.id == registrarInfo.id
  );

  if (uniqueIDCheck) {
    alert('Duplicate ID, Please Enter a unique ID');
    return;
  }

  let x = [...registrarData, registrarInfo];

  localStorage.setItem('registrar', JSON.stringify(x));
  alert('Booking Successfull');
};
