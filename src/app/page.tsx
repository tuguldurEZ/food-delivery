import Foods from "./(main)/components/Foods";
import Authlayout from "./(main)/layout";

export default function Home() {
  return (
    <div className="bg-[#404040]">
      <Authlayout>
        <div
          style={{
            backgroundImage: `url("https://res.cloudinary.com/dhvtog3m2/image/upload/v1739972500/a0g2m0njixoflsowgo8f.png")`,
          }}
          className="w-full h-[570px] bg-cover bg-center"
        ></div>
        <Foods />
      </Authlayout>
    </div>
  );
}
