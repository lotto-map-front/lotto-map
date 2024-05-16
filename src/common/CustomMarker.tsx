const CustomMapMarker = () => {
  const contentArray = [
    `<div style="display: flex; flex-direction: column; align-items: center; width: 50px; height: 50px;">`,
    ` <div style="display: flex; justify-content: center; align-items: center; width: 50px; height: 50px;">`,
    ` <img src="/assets/marker-icon-2.png" style="width: 30px; height: 30px; border-radius: 50%;"/>`,
    `</div>`,
  ];

  return contentArray.join('');
};

export default CustomMapMarker;
