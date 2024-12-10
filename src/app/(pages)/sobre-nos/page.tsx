import Image from 'next/image';

export default function SobreNos() {
  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <section
        className="container mx-auto px-4 py-8 md:py-16 bg-cover bg-center animate-fadeIn"
      >
        <div className="text-center mb-8 md:mb-16 animate-slideDown">
        <div className="w-full md:hidden animate-slideRight pb-10 flex justify-center items-center">
            <Image
              src="/images/logo-msb.png"
              alt="MSB Tecnologia Logo"
              className="w-full max-w-[200px] hover:scale-105 transition-transform duration-300"
              width={200}
              height={200}
            />
          </div>
          <h2 className="text-sm font-semibold tracking-widest text-gray-600 uppercase">
            SOBRE NÓS
          </h2>
          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mt-2 mb-4 md:mb-8 animate-pulse hover:text-blue-700 transform hover:scale-105 transition-all duration-300"> 
            Quem somos?
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12 md:mb-20">
          <div className="w-full md:w-1/2 animate-slideLeft">
            <p className=" px-4  md:px-0 md:text-[21px] leading-relaxed text-gray-800 
                         transition-all duration-300 
                         text-center md:text-left hover:text-blue-900 hover:text-bold transform hover:scale-105 transition-all duration-300"> 
              Fundada em 2016, a MSB é referência em soluções eficientes de tecnologia da informação e comunicação. Nossa missão é fornecer serviços de alta qualidade, desenvolvendo soluções personalizadas que atendam às necessidades específicas de cada cliente. Com uma equipe altamente qualificada e comprometida, buscamos constantemente a inovação e a excelência em nossos serviços, garantindo a satisfação total de nossos clientes.
            </p>
          </div>
          <div className="hidden md:block w-full md:w-1/2 animate-slideRight">
            <Image
              src="/images/logo-msb.png"
              alt="MSB Tecnologia Logo"
              className="w-full max-w-[250px] md:max-w-md mx-auto hover:scale-105 transition-transform duration-300"
              width={500}
              height={500}
            />
          </div>
        </div>

        <div className="mt-12 md:mt-24 animate-slideUp">
          <h2 className="text-sm font-semibold tracking-widest text-gray-600 uppercase text-center mb-2">
            NOSSOS SERVIÇOS
          </h2>
          <h3 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-2 md:mb-4 hover:text-blue-700 transform hover:scale-105 transition-all duration-300">
            Solução do seu problema
          </h3>
          <p className="text-2xl md:text-4xl font-bold text-blue-900 text-center mb-8 md:mb-16 hover:text-blue-700 transform hover:scale-105 transition-all duration-300">
            através da tecnologia!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className="group bg-white rounded-lg shadow-lg p-4 md:p-6 
                          hover:shadow-xl transition-all duration-300 
                          hover:scale-[1.02] active:scale-95
                          hover:-translate-y-1
                          cursor-pointer
                          animate-fadeIn"> 
              <h4 className="text-lg md:text-xl font-semibold text-blue-900 mb-2 md:mb-4
                           group-hover:text-blue-700 transition-colors">
                Desenvolvimento de Software Personalizado
              </h4>
              <p className="text-sm md:text-base text-gray-600 
                          group-hover:text-gray-800 transition-colors">
                Oferecemos desenvolvimento de software sob medida para atender às necessidades específicas do seu negócio, garantindo soluções eficientes e escaláveis.
              </p>
            </div>

            <div className="group bg-white rounded-lg shadow-lg p-4 md:p-6 
                          hover:shadow-xl transition-all duration-300 
                          hover:scale-[1.02] active:scale-95
                          hover:-translate-y-1
                          cursor-pointer
                          animate-fadeIn"> 
              <h4 className="text-lg md:text-xl font-semibold text-blue-900 mb-2 md:mb-4
                           group-hover:text-blue-700 transition-colors">
                Consultoria em TI
              </h4>
              <p className="text-sm md:text-base text-gray-600 
                          group-hover:text-gray-800 transition-colors">
                Assessoria especializada para otimizar seus processos tecnológicos, identificar oportunidades de melhoria e implementar as melhores soluções.
              </p>
            </div>

            <div className="group bg-white rounded-lg shadow-lg p-4 md:p-6 
                          hover:shadow-xl transition-all duration-300 
                          hover:scale-[1.02] active:scale-95
                          hover:-translate-y-1
                          cursor-pointer
                          animate-fadeIn"> 
              <h4 className="text-lg md:text-xl font-semibold text-blue-900 mb-2 md:mb-4
                           group-hover:text-blue-700 transition-colors">
                Suporte Técnico
              </h4>
              <p className="text-sm md:text-base text-gray-600 
                          group-hover:text-gray-800 transition-colors">
                Suporte técnico especializado e proativo, garantindo a continuidade e eficiência das suas operações tecnológicas.
              </p>
            </div>

            <div className="group bg-white rounded-lg shadow-lg p-4 md:p-6 
                          hover:shadow-xl transition-all duration-300 
                          hover:scale-[1.02] active:scale-95
                          hover:-translate-y-1
                          cursor-pointer
                          animate-fadeIn"> 
              <h4 className="text-lg md:text-xl font-semibold text-blue-900 mb-2 md:mb-4
                           group-hover:text-blue-700 transition-colors">
                Infraestrutura de TI
              </h4>
              <p className="text-sm md:text-base text-gray-600 
                          group-hover:text-gray-800 transition-colors">
                Planejamento e implementação de infraestrutura tecnológica robusta e segura, adequada às necessidades do seu negócio.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}