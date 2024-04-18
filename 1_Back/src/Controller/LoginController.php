<?php

    namespace App\Controller;
    
    use App\Entity\Usuario;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\JsonResponse;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\Routing\Annotation\Route;
    use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
    use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

    class LoginController extends AbstractController
    {
        private $jwtManager;

        public function __construct(JWTTokenManagerInterface $jwtManager)
        {
            $this->jwtManager = $jwtManager;
        }

        #[Route('/login', name: 'app_login', methods: ['POST'])]
        public function login(Request $request, AuthenticationUtils $authenticationUtils): JsonResponse
        {
            // Obtener el error de autenticación (si lo hay) y el último nombre de usuario intentado
            $error = $authenticationUtils->getLastAuthenticationError();
            $lastUsername = $authenticationUtils->getLastUsername();

            // Verificar si hay un error de autenticación
            if ($error) {
                return new JsonResponse(['error' => 'Invalid credentials'], JsonResponse::HTTP_UNAUTHORIZED);
            }

            // Obtener el usuario autenticado
            $user = $this->getUser();

            // Verificar si el usuario existe
            if (!$user) {
                return new JsonResponse(['error' => 'User not found'], JsonResponse::HTTP_NOT_FOUND);
            }

            // Generar el token JWT utilizando el servicio JWTTokenManagerInterface
            $token = $this->jwtManager->create($user);

            // Devolver el token JWT en la respuesta
            return new JsonResponse(['token' => $token]);
        }

        /*#[Route('/getUser', name: 'getUser', methods: ['POST'])]
        public  function login(Request $request)
        {
            // Decodificar los datos JSON de la solicitud
            $data = json_decode($request->getContent(), true);

            $Usuario = new Usuario();

        }

        public function logout(): JsonResponse
        {
            return new JsonResponse([
                'msg'=>'Logged out Successfully',
            ]);
        }*/

    }
