import { button } from "../../../shared/button/button";

const ContactUs = () => {
  return (
    <main className="bg-purpleblack font-br-regular">
      <section className="m-auto px-4 py-[5em] lg:w-[80%] lg:px-0">
        <header className="m-auto w-full text-center lg:w-[30%]">
          <h1 className="gradient-text text-center font-br-semibold text-3xl">
            Contact Us
          </h1>
          <div>
            <p className="mt-[1.5em] font-br-light leading-7 text-text">
              Have questions or need assistance? Our customer support team is
              here to help 24/7.
            </p>
          </div>
        </header>
        <section>
          <form className="m-auto mt-[2em] border border-border px-[1.5em] py-[2em] text-text lg:w-[70%] lg:px-[5em]">
            <div className="flex flex-col gap-3">
              <label htmlFor="name">First Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                className="rounded-md border border-border bg-inherit p-2 placeholder:text-border"
              />
            </div>
            <div className="sm:grid-row-1 mt-[1em] grid grid-cols-2 gap-5">
              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email address"
                  className="mt-3 w-full rounded-md border border-border bg-inherit p-2 placeholder:text-border"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="Enter your phone number"
                  className="mt-3 w-full rounded-md border border-border bg-inherit p-2 placeholder:text-border"
                />
              </div>
            </div>
            <div className="mt-[2em] flex flex-col gap-3">
              <label htmlFor="message">Send us a message</label>
              <textarea
                id="message"
                placeholder="Describe your message"
                className="h-[180px] border border-border bg-inherit p-2 placeholder:text-border"
              ></textarea>
            </div>
            <div className="mt-[1.5em]">
              <button.PrimaryButton className="w-full">
                Send Message
              </button.PrimaryButton>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
};

export default ContactUs;
