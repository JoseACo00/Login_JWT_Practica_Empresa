<?php

namespace App\Controller;

use App\Form\ForgotPasswordType;
use App\Repository\UsuarioRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use App\Entity\Usuario;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;

class ResetController extends AbstractController
{

    private $usuarioRepository;

    public function __construct(UsuarioRepository $usuarioRepository)
    {
        $this->usuarioRepository = $usuarioRepository;
    }

    // Cambiar o actualizar la contraseña utilizando el token de restablecimiento 002
    #[Route('/reset-password/{token}', name: 'app_reset')]
    public function cambiarPassword(Request $request, string $token): JsonResponse
    {
        // Obtener los datos del formulario enviado por el cliente
        $data = json_decode($request->getContent(), true);
        $password = $data['password'] ?? null;

        // Verificar si se proporcionó una contraseña nueva
        if (!$password) {
            return new JsonResponse(['error' => 'La contraseña nueva es obligatoria'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Buscar el usuario por el token de restablecimiento de contraseña
        $usuario = $this->getDoctrine()->getRepository(Usuario::class)->findOneBy(['reset_password' => $token]);

        // Verificar si se encontró un usuario con el token proporcionado
        if (!$usuario) {
            return new JsonResponse(['error' => 'Token de restablecimiento de contraseña no válido'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Encriptar la nueva contraseña
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $usuario->setPassword($hashedPassword);

        //Da fallo
        //$hashedPassword = password_hash($usuario->getPassword(), PASSWORD_DEFAULT);
        //$usuario->setPassword($hashedPassword);

        // Eliminar el token de restablecimiento de contraseña
        // Tema de suguridad para que no te pueda coger el token
        $usuario->setResetPassword(null);


        // Guardar los cambios en la base de datos
        try {
            $em = $this->getDoctrine()->getManager(); // Obtener el Entity Manager
            $em->flush(); // Guardar los cambios en la base de datos

            return new JsonResponse(['message' => 'Contraseña actualizada correctamente'], JsonResponse::HTTP_OK);
        } catch (\Exception $exception) {
            return new JsonResponse(['error' => $exception->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

        #[Route('/reset_password', name: 'reset_Password')]
    public function sendEmail ( Request $request ,MailerInterface $mailer, UsuarioRepository  $usuarioRepository, TokenGeneratorInterface  $tokenGenerator): JsonResponse //Response Simpere Json
    {

        // Obtener los datos del cuerpo de la solicitud
        $data = json_decode($request->getContent(), true);
        // Obtener el correo electrónico y la contraseña del cuerpo de la solicitud
        $email = $data['email'] ?? null;

        //Verificar que el correo electronico fue introducido
        if(!$email){
            // UTILIZAR JSON RESPONSE return  new Response(['Message' => 'El email es necesario'], JsonResponse::HTTP_BAD_REQUEST);
            return new JsonResponse(['error' => 'El email es necesario'], JsonResponse::HTTP_BAD_REQUEST);

        }

        // Buscar al usuario por su correo electrónico
        $usuario = $usuarioRepository->findOneBy(['Email' => $email]);

        if (!$usuario) {
            return new JsonResponse(['error' => 'No se encontró ningún usuario relacionado con este correo electrónico'], JsonResponse::HTTP_NOT_FOUND);
        }

        try {


            // 1 Generar y almacenar el token para el usuario
            $token = $tokenGenerator->generateToken();
            $usuario->setResetPassword($token);
            $em = $this->getDoctrine()->getManager();
            $em->persist($usuario);
            $em->flush();
            // Generar la URL para el restablecimiento de contraseña
            // Generar la URL para el restablecimiento de contraseña
            //$resetUrl = 'http://tuaplicacion.com/reset_password?token=' . $token;
            $resetUrl = 'http://localhost:4200/reset-password?token=' . $token;

            //-------------------------

            //2 ENVIAMOS EL EMAIL
            $email = (new Email())
                ->from('jalexander@knowledgefy.com')
                ->to ($email)
                ->subject('Restablecer contraseña olvidada')
                ->text('Sending emails is fun again!')
                ->html('<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><p><a href="' . $resetUrl . '">Restablecer contraseña</a></p>');



            $mailer->send($email);

            //return  new Response('El mail fue enviado correctamente');
            return new JsonResponse(['message' => 'El correo fue enviado correctamente']);

        } catch (\Throwable $th) {
            return new JsonResponse(['error' => $th->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);

        }

    }

    //GENERAMOS EL TOKEN DE MANERA  Y SE IMPLEMENTA EN LA FUNCIÓN PRINCIPAL
    public function generateToken(Request $request, TokenGeneratorInterface  $tokenGenerator, Usuario $usuario)
    {

        try{
            //Generamos el token
            $token = $tokenGenerator->generateToken();

            // Almacenar el token en la base de datos
            $usuario->setResetPassword($token);
            $em = $this->getDoctrine()->getManager();
            $em->persist($usuario);
            $em->flush();

            // Generar la URL para el restablecimiento de contraseña
            $url = $this->generateUrl('app_reset_password', ['token' => $token], UrlGeneratorInterface::ABSOLUTE_URL);

            // Retornar una respuesta JSON con la URL generada
            return new JsonResponse([' Esta es la Url creada con el token url:' => $url], JsonResponse::HTTP_OK);

        }catch (\Exception $exception) {
            // Manejar errores y retornar una respuesta de error
        return new JsonResponse(['error' => $exception->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
