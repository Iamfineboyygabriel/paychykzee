import ceo from "../../../assets/png/ceo.png";

const About = () => {
  return (
    <main className="bg-purpleblack text-text w-full font-br-regular">
      <section className="m-auto flex w-[90%] max-w-screen-lg flex-col justify-between lg:w-[80%] lg:flex-row">
        <div className="pt-[3.5em] lg:w-[43%]">
          <article>
            <p className="font-br-light text-xl">About Us</p>
          </article>
          <header className="mt-[1.7em]">
            <h1 className="gradient-text font-br-bold text-3xl sm:text-4xl">
              Pay ChyKzee
            </h1>
          </header>
          <div className="mt-[1.7em]">
            <article className="font-br-light text-base leading-7 sm:text-lg">
              PayChykzee bridges the gap between the complex currency exchange
              process and the need for a user-friendly solution. We recognized
              the difficulties faced by businesses and individuals in managing
              foreign currencies and set out to develop a platform that offers a
              seamless experience.
            </article>
          </div>
        </div>
        <div className="mt-[2em] flex justify-center lg:mt-[5em] lg:justify-end">
          <img src={ceo} alt="ceo" className="w-full max-w-xs lg:max-w-md" />
        </div>
      </section>
    </main>
  );
};

export default About;
