export const weatherData = (data) => {
    const {description, resolvedAddress, currentConditions} = data;
    const {
        temp,
        feelslike,
        humidity,
        conditions,
        datetime,
        windspeed,
        icon,
        precip
      } = currentConditions;
    
    const weatherData = {
        temp,
        feelslike,
        humidity,
        description,
        conditions,
        datetime,
        windspeed,
        location: resolvedAddress,
        icon,
        precip
    }
    return weatherData;

}