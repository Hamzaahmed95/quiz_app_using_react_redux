import React, { useEffect, useState } from "react";
import firebase from "firebase";

const FetchData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  /*
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    firebase
      .database()
      .ref("registeredCar")
      .orderByChild("registeredBy")
      .equalTo("Hamza")
      .on("value", snapshot => {
        let isCarRegistered = false;
        let car = "";
        snapshot.forEach(function (data) {
          car = data.child("car").val();
          if (car) {
            getCarDetails(car);
          }
          if (data.child("isRegistered").val()) {
            isCarRegistered = true;
          }
        });
        setDriving(isCarRegistered);
      });
  };
  getCarDetails = car => {
    firebase
      .database()
      .ref("rentCarsList")
      .orderByChild("name")
      .equalTo(car)
      .on("value", snapshot => {
        snapshot.forEach(function (data) {
          setCarDetails(data.val());
        });
      });
  };
  */

  const getData = () => {
    firebase
      .database()
      .ref("car")
      .once("value")
      .then(snapshot => {
        snapshot.forEach(child => {
          console.log(child.val());
          setData([...data, child.val()]);
        });
      })
      .catch(error => {});
  };
  console.log(data);
  return (
    <div>
      <h1>Hello</h1>
      {data.map(element => (
        <div>{element.name}</div>
      ))}
    </div>
  );
};

export default FetchData;
