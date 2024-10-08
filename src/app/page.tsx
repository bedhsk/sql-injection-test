import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Bienvenido a nuestra aplicación</h1>
      <Link href="/login">
        Ir a la página de login
      </Link>
    </main>
  );
}