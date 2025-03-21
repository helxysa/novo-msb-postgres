import Link from "next/link";
export default function Footer() {
    return (
      <footer className="w-full bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center py-4 sm:py-6 lg:py-8">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">MSB</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300">
                &copy; {new Date().getFullYear()} Todos os direitos reservados
              </p>
            </div>
  
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 lg:gap-12">
              <a href="/sobre-nos/" className="text-sm sm:text-base lg:text-lg hover:text-gray-300 transition-colors">
                Sobre
              </a>
              <a href="/sobre-nos/" className="text-sm sm:text-base lg:text-lg hover:text-gray-300 transition-colors">
                Contato
              </a>
              <Link href="/admin" className="hidden sm:block text-sm sm:text-base lg:text-lg hover:text-gray-300 transition-colors">
                Area do Recrutador
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }