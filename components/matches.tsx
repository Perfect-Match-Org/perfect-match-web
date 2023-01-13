function Matches(props: any) {
  let randomNum = Math.floor(Math.random() * 10);
  let nameToReturn = "Romeo";
  if (randomNum % 2 == 0) {
    nameToReturn = "Juliet";
  }
  return (
    <section className="bg-gray-200">
      <div className="mx-auto max-w-screen-xl  lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold text-rose-400 sm:text-5xl">
            Slow down, {nameToReturn}...
          </h1>
          <p className="mt-4 sm:text-xl text-black sm:leading-relaxed">
            Matches aren&apos;t released yet. Check back later.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Matches;
