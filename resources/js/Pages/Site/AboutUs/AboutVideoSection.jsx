export default function AboutVideoSection() {
  return (
    <section className="relative h-[450px] md:h-[600px] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          alt="Luxurious art interior background"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgp0eJIZv1Nx3EFdMEN7zLbcYaEO4RRRPW8JLCjujc30dK5FYObqaEn_5bR1mucEv01LQpGrnMVW9Qw0bA8AyqNkic5c5i-CWomLbKdzjmkthesCaHt3dHwvZtEPwSTYhJhWOZ5VU3xvLqPYuVTQuxkskMy_zKZYx_vastkC40uc70IOB8BC8ZFHwAuHPtusbKKxgjIGQBR9ZtwPAPwMapzqrc8qkGY7LMLaEco-_E19xbPKWdoLaVM5Fj6f5J79tkVHFIeLU"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="relative z-10 text-center text-white px-4">
        <button className="bg-art-brown hover:bg-art-dark transition-colors w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto shadow-2xl">
          <svg className="h-10 w-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 22v-20l18 10-18 10z" />
          </svg>
        </button>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-serif">
          اكتشف الفرق مع بوابة الفن
        </h2>
      </div>
    </section>
  );
}
