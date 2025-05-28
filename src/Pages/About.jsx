// src/AboutTweak.jsx
export default function AboutTweak() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-12">
      <div className="bg-white max-w-xl w-full p-6 rounded-xl shadow-xl text-center">
        <h1 className="text-2xl font-bold mb-4">About Tweak</h1>
        <p className="text-gray-700 text-sm mb-3">
          Welcome to <a href="#" className="text-blue-600 underline">Tweak</a> — your personal styling playground! Here, you can see how different outfits and styles look on you without stepping into a store.
        </p>
        <p className="text-gray-700 text-sm mb-3">
          With Tweak, you can customize an <a href="#" className="text-blue-600 underline">avatar</a> that looks like you and try on different appearances. Change the <a href="#" className="text-blue-600 underline">skin tone</a>, <a href="#" className="text-blue-600 underline">hair color</a>, <a href="#" className="text-blue-600 underline">shirt</a>, <a href="#" className="text-blue-600 underline">pants</a>, and <a href="#" className="text-blue-600 underline">shoes</a> — all in real-time. You can even switch between different avatars and see what suits you best.
        </p>
        <p className="text-gray-700 text-sm mb-6">
          We created Tweak to make fashion fun, easy, and interactive for everyone. Whether you’re planning a look for a special day or just experimenting, this is your space to explore and express your style.
        </p>

        {/* <h2 className="text-left font-semibold mb-2">Meet Our Team</h2>
        <div className="space-y-3">
          {["Member 1", "Member 2", "Member 3", "Member 4"].map((member, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md text-left">
              <p className="font-bold">{member}</p>
              <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div> */}

        <div className="mt-6 text-sm text-gray-700">
          <p className="mb-2">Connect with us:</p>
          <div className="flex justify-center space-x-4 text-blue-600 underline">
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">Facebook</a>
          </div>
        </div>
      </div>
    </div>
  );
}
