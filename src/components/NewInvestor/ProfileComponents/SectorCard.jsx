export default function SectorCard({ sector }) {
  return (
    <div className="interested_card border rounded-4 " id={sector.id}>
      <img
        className=""
        src={
          sector.logo ||
          "https://res.cloudinary.com/drjt9guif/image/upload/v1692264454/TheCapitalHub/users/default-user-avatar_fe2ky5.webp"
        }
        alt="sector"
        width={50}
        height={50}
      />
      <h6 className="m-0">{sector.name}</h6>
    </div>
  );
}
