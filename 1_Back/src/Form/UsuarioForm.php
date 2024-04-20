<?php

namespace App\Form;

use App\Entity\Usuario;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class UsuarioForm extends AbstractType
{
    // TIENE 2 MÉTEDOS LAS CLASES DE FORMULARIOS MUY IMPORTANTES
    public  function  buildForm(FormBuilderInterface $builder, array $options)
    {
        //UTILIZA  FormBuilderInterface
        //SE CONSTRUYE UN FORMULARIO PARA QUE SE PUEDA RENDERIZAR O VALIDAR

        //SE ESTABLECE QUE CAMPOS VA A TENER EL FORMULARIO

        $builder
            ->add('name', TextType::class, [
                'required' => true, //ES OBLIGATORIO REQUERIDO
                'constraints' => [ //SE PONE EL RESTO DE LAS RESTRCCIONES DENTRO DE CONSTRAINSTS
                    new Length([
                        'min' => 3,
                        'max' => 60,
                        'minMessage' => 'El nombre de usuario debe tener al menos 3 caracteres ',
                        'maxMessage' => 'El nombre de usuario es demasido largo ',
                    ])
                ]
            ])->add('email', TextType::class, [
                'required' => true,
                'constraints' => [
                    new NotBlank([
                        'message' => 'Por favor debes ingresar tú email',
                    ]),

                ]
            ])

            ->add('phone', TextType::class, [
                'required' => true,
                'constraints' => [
                    new NotBlank([
                        'message' => 'Por favor ingresa tu número de teléfono'
                    ]),
                    new Length([
                        'min' =>  6,
                        'max' => 12,
                        'minMessage' => 'El número de teléfono debe tener al menos {{ limit }} caracteres',
                        'maxMessage' => 'El número de teléfono no puede tener más de {{ limit }} caracteres'
                    ]),
                    // También puedes agregar expresiones regulares para validar el formato del número de teléfono.
                ]
            ])
            ->add('password', TextType::class, [ // Cambiado a TextType
                'required' => true,
                'constraints' => [
                    new NotBlank([
                        'message' => 'Este campo no puede estar vacío',
                    ]),
                    new Length([
                        'min' => 6,
                        'max' => 30,
                        'minMessage' => 'La contraseña debe tener al menos 6 caracteres',
                        'maxMessage' => 'La contraseña es demasiado larga',
                    ])
                ]
            ]);



    }

    //2
    // ENLAZAR UN FORMULARIO A UNA CLASE ESPECIFICA Y LO MEJOR CON UN ENTITY
    public function  ConfigureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Usuario::class
        ]);
    }
}