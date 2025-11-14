export default function RestaurantCard({ data }) {
  return (
    <div className="shadow rounded-lg overflow-hidden bg-white">
      <img
        src={data.image}
        className="h-32 w-full object-cover"
        alt={data.name}
      />
      <div className="p-3">
        <h2 className="text-lg font-semibold">{data.name}</h2>
        <p className="text-gray-500 text-sm">{data.address}</p>
        <p className="text-yellow-500 font-bold mt-1">
          ⭐ {data.rating}
        </p>
      </div>
    </div>
  );
}
