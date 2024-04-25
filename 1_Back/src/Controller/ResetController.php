<?php

namespace App\Controller;

use http\Env\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;

class ResetController extends AbstractController
{
    #[Route('/reset', name: 'app_reset')]
    public function index(Request $request): Response
    {
        return $this->render('reset/index.html.twig', [
            'controller_name' => 'ResetController',
        ]);
    }

    #[Route('/email', name: 'reset_Password')]
    public function sendEmail (MailerInterface $mailer): Response
    {
        try {
            $email = (new Email())
                ->from('jalexander@knowledgefy.com')
                ->to('alexcoca100@gmail.com')
                ->subject('Time for Symfony Mailer!')
                ->text('Sending emails is fun again!')
                ->html('<p>El correo te llego ehhhh</p>');

            $mailer->send($email);

            return  new Response('El mail fue enviado');

        } catch (\Throwable $th) {
            return new Response($th->getMessage());
        }

    }
}
