import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json()

        if (!email) {
            return NextResponse.json(
                { error: 'Email é obrigatório' },
                { status: 400 }
            )
        }

        // Validação básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Email inválido' },
                { status: 400 }
            )
        }

        // Configurações do Mailchimp
        const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
        const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
        const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX // ex: us21

        if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_SERVER_PREFIX) {
            console.error('Configurações do Mailchimp não encontradas')
            return NextResponse.json(
                { error: 'Erro de configuração do servidor' },
                { status: 500 }
            )
        }

        // URL da API do Mailchimp
        const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`

        // Dados para enviar ao Mailchimp
        const data = {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: '',
                LNAME: ''
            }
        }

        // Fazer a requisição para o Mailchimp
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        const responseData = await response.json()

        if (response.ok) {
            return NextResponse.json({
                message: 'Inscrição realizada com sucesso!',
                data: responseData
            })
        } else {
            // Tratar diferentes tipos de erro do Mailchimp
            if (responseData.title === 'Member Exists') {
                return NextResponse.json(
                    { error: 'Este email já está inscrito na nossa newsletter.' },
                    { status: 400 }
                )
            } else if (responseData.title === 'Invalid Resource') {
                return NextResponse.json(
                    { error: 'Email inválido.' },
                    { status: 400 }
                )
            } else {
                console.error('Erro do Mailchimp:', responseData)
                return NextResponse.json(
                    { error: 'Erro ao processar inscrição. Tente novamente.' },
                    { status: 400 }
                )
            }
        }

    } catch (error) {
        console.error('Erro na API da newsletter:', error)
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}
