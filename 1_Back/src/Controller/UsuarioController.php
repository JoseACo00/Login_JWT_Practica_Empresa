<?php

namespace App\Controller;

use App\Entity\Usuario;
use App\Form\UsuarioForm;
use App\Repository\UsuarioRepository;
use Doctrine\ORM\EntityManagerInterface;
use PhpParser\Node\Name;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UsuarioController extends AbstractController
{


    //Recive una solicitud REQUEST y siempre devuelve un objeto Response
    //DENTRO TENDREMOS ACCESO A LOS METODOS POST, GET, HEAD ...


    //REQUEST PARA : OBTENER VALORES DEL PARAMETRO GET, POST, SERVIDOR,
    //OBTNER ARCHIVOS , DATOS DE LAS COOKIES

    //1 recuperar la información

    /*  if($request->getMethod() == "POST"){
          $name = $request->request->get(name);
          $email =$request->request->get(email);
          $phone = $request->request->get(phone);

          if(isset($name) && $name != '');

      }

      return $this->render('usuario/crear_usuario.html.twig'); */

// $em =$this->getDoctrine()->getManager(); // ALmancenar objeto en la base de datos

// $em->persist($Usuario);
//  $em->flush(); //Procede el sql y lo mete

// COMO METER DEL FROM AL ALGO ...

//CON ESTO GUARDA SE  UN OBJETO EN LA BASE DE DATOS

//Define la ruta del endpoint para crear un nuevo usuario mediante una solicitud POST
    #[Route('/usuario_nuevo', name: 'add_usuario', methods: ['POST'])]
    public function CrearUsuario(Request $request)
    {
        //de las primeras coasas
        $data = json_decode($request->getContent(), true);

        // Crea una nueva instancia de la entidad User
        $Usuario = new Usuario();
        // Crea un formulario utilizando personaForm y la nueva instancia de User
        $personaForm = $this->createForm(UsuarioForm::class, $Usuario);

        $personaForm->submit($data);
        // Maneja la solicitud HTTP para el formulario
       // $personaForm->handleRequest($request);

        // Verifica si el formulario ha sido enviado y si los datos son válidos
        if( $personaForm->isValid()){
            // Obtiene los datos del formulario
            $usuario = $personaForm->getData();
            // Obtiene el EntityManager para interactuar con la base de datos
            $em =$this->getDoctrine()->getManager(); // ALmancenar objeto en la base de datos
            $em ->persist($usuario);
            $em ->flush();// Guarda los cambios en la base de datos

            $this->addFlash('success', 'El usuario ha sido creado exitosamente');
            return new JsonResponse(['status' => 'Usuario creado exitosamente'], JsonResponse::HTTP_CREATED);
        }
        return new JsonResponse(['error' => 'Los datos del usuario no son válidos'], JsonResponse::HTTP_BAD_REQUEST);
    }

    //-------------------------------------------------
    //EJEMPLO DE VIDEO ANGULAR CON SYMFONY
    //#[Route('/nuevo-usuario', name:"app_usuario", methods:"POST")]
    public  function NewUsuario(Request $request, EntityManagerInterface $em):Response
    {
        $request = $this->transformJsonBody($request);
        //dump($request->get('name'));

        $usuario =new Usuario();
        $usuario->setName($request->get('name'));
        $usuario->setEmail($request->get('email'));
        $usuario->setPhone($request->get('phone'));
        $usuario->setPassword($request->get('password'));

        $em->persist($usuario); //Insertar Usuario del formulario
        $em->flush();// refresca la BD

        return  new Response("El usuario ha sido creado exitosamente",
            Response::HTTP_OK
        );

    }

    #[Route('/usuario', name:'app_usuario')]
    public function index(): Response
    {
        return $this->render('usuario/index.html.twig', [
            'controller_name' => 'UsuarioController',
        ]);
    }

    //FUNCIONA SI
     //----------------------------------------------------------------------------------------------------------------------
    //API REST
     //INSERTAR DATOS

    // Declara una propiedad privada para almacenar el repositorio UsuarioRepository
    private $usuarioRepository;

    public function __construct(UsuarioRepository $usuarioRepository)
    {
        $this->usuarioRepository = $usuarioRepository;
    }

//    /**
//     * @Route("usuario_add", name="app_usuario", methods={"POST"})
//     */
//    public function add(Request $request): JsonResponse
//    {
//        $data = json_decode($request->getContent(), true);
//
//        $name = $data['name'];
//        $email = $data['email'];
//        $phone = $data['phone'];
//        $password = $data['password'];
//
//
//        if (empty($name) || empty($email) || empty($phone) || empty($password)) { // Verifica si el nombre, el correo electrónico o el teléfono están vacíos
//            return new JsonResponse(['error' => 'Los campos name, email y phone son requeridos'], JsonResponse::HTTP_BAD_REQUEST); // Devuelve una respuesta de error si alguno de los campos requeridos está vacío
//        }
//
//        $this->petRepository->saveUser($name, $email, $phone, $password);
//
//        return new JsonResponse(['status' => 'Usuario Creado!'], Response::HTTP_CREATED);
//    }

//    /**
//     * @Route("usuario_add", name="app_usuario", methods={"POST"})
//     */
//    public function add(Request $request): JsonResponse
//    {
//        $data = json_decode($request->getContent(), true);
//
//        $name = $data['name'];
//        $email = $data['email'];
//        $phone = $data['phone'];
//        $password = $data['password'];
//
//        if (empty($name) || empty($email) || empty($phone) || empty($password)) {
//            return new JsonResponse(['error' => 'Los campos name, email, phone y password son requeridos'], JsonResponse::HTTP_BAD_REQUEST);
//        }
//
//        $this->usuarioRepository->saveUser($name, $email, $phone, $password);
//
//        return new JsonResponse(['status' => 'Usuario Creado!'], Response::HTTP_CREATED);
//    }
}
