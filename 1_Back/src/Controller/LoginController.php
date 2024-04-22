<?php

    namespace App\Controller;
    
use App\Entity\Usuario;

use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\JsonResponse;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\Routing\Annotation\Route;
    use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;


    class LoginController extends AbstractController
    {

        private $jwtEncoder;

        public function __construct(JWTEncoderInterface $jwtEncoder)
        {
            $this->jwtEncoder = $jwtEncoder;
        }

        #[Route('/login', name: 'app_login', methods: ['POST'])]
        public function login(Request $request): JsonResponse
        {
            // Obtener los datos del cuerpo de la solicitud
            $data = json_decode($request->getContent(), true);

            // Obtener el correo electrónico y la contraseña del cuerpo de la solicitud
            $email = $data['email'] ?? null;
            $password = $data['password'] ?? null;

            // Verificar si el correo electrónico y la contraseña están presentes
            if (!$email || !$password) {
                return new JsonResponse(['error' => 'Email and password are required'], JsonResponse::HTTP_BAD_REQUEST);
            }

            // Buscar el usuario por su correo electrónico en la base de datos
            $Usuario = $this->getDoctrine()->getRepository(Usuario::class)->findOneBy(['Email' => $email]);

            // Verificar si el usuario existe y si la contraseña es válida
            if (!$Usuario) {
                return new JsonResponse(['error' => 'Invalid email'], JsonResponse::HTTP_UNAUTHORIZED);
            }


            // Crear un array de datos del usuario para incluir en el token JWT
            $userData = [
                'email' => $Usuario->getEmail(),
                // Otros datos del usuario que quieras incluir en el token
            ];

            // Generar el token JWT
            $token = $this->jwtEncoder->encode($userData);

            // Devolver el token JWT en la respuesta
            return new JsonResponse(['token' => $token]);
        }

//        #[Route('/getUser', name: 'getUser', methods: ['POST'])]
//        public  function login(Request $request)
//        {
//            // Decodificar los datos JSON de la solicitud
//            $data = json_decode($request->getContent(), true);
//
//            $Usuario = new Usuario();
//
//        }

        public function logout(): JsonResponse
        {
            return new JsonResponse([
                'msg'=>'Logged out Successfully',
            ]);
        }

    }
