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
