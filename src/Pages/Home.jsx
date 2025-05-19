const home = () => {
  const gradientBackground = {
    background: 'linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1)',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={gradientBackground}>
      <h1 className="text-3xl font-bold text-purple-700">Welcome to the Home Page!</h1>
    </div>
  );
};

export default home;
