let url = 'https://raw.githubusercontent.com/plotly/datasets/master/3d-scatter.csv';

(async () => {
    let data = await fetch(url);
    let response = await data.text();
    let junk = CSVToJSON(response)
    console.log('junk.', junk)
    return junk;
})();


const CSVToJSON = (data, delimiter = ',') => {
    const titles = data.slice(0, data.indexOf('\r\n')).split(delimiter);
    console.log('titles', titles)
    return data
      .slice(data.indexOf('\r\n') + 1)
      .split('\r\n')
      .map(v => {
        const values = v.split(delimiter);
        return titles.reduce(
          (obj, title, index) => ((obj[title] = values[index]), obj),
          {}
        );
      });
  };