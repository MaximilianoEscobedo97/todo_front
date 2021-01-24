export default (process.env.NODE_ENV === 'production')
    ? process.env.REACT_APP_HOST_URL
    : process.env.REACT_APP_LOCAL_HOST_URL