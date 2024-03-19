import { Resend } from "resend";
import asyncHandler from "express-async-handler";
const sendParticipantEmail = asyncHandler(async (req, res) => {
  const {
    nom,
    prenom,
    email,
    telephone,
    civilite,
    id,
    niveau,
    etablissement,
    ville,
    no_dossier,
  } = req.body;
  console.log(req.body);
  const html = `<div class="container">


    <p>Chèr(e) ${civilite} ${prenom} ${nom}</p>
    <p>C’est avec plaisir que nous recevons votre inscription aux Olympiades Sciences 2024 organisées par la Chaire UNESCO Femmes et Sciences pour le Développement de l’ISTEAH.</p>
    <p>Nous avons noté que vous êtes en ${niveau} au
        ${etablissement}, que vous résidez à
        ${ville} et que vous possédez un téléphone dont le numéro est
        ${telephone}.</p>
        <p>Cliquez sur le lien suivant: <a href="https://olympiade.grahn-monde.org/edit-participant/${id}"
            class="btn-email">Modification de dossier</a>
        ou utilisez ce code <strong>${no_dossier}</strong> pour
        corriger les données erronées en vous reconnectant en utilisant le lien suivant: <a
            href="https://olympiade.grahn-monde.org/edit-dossier/${id}" class="btn-email">Page de modification</a></p>
            <p>Pour rejoindre le groupe whatsapp, cliquez sur le lien suivant: <a href="https://chat.whatsapp.com/Bptp2yJy9G5J6d2BtJTDaA">https://chat.whatsapp.com/Bptp2yJy9G5J6d2BtJTDaA</a></p>
    <p>Nous vous remercions encore une fois.</p>
    <p class="p">Au nom de l’Organisation des Olympiades Nationales Haïti Sciences 2024</p>
    <p class="p">Rose-Michelle SMITH, Ph.D.</p>
    <p class="p">Professeure</p>
    <p class="p">Titulaire de la Chaire UNESCO Femmes et Sciences pour le Développement</p>
    <p class="p">Institut des Sciences, des Technologies et des Etudes Avancées d'Haiti (ISTEAH)</p>
    <p><strong>mail:</strong> rose-michelle.smith@isteah.ht</p>


    <style>
        .container {
            padding: 16px;
            margin: 0 auto;
        }

        .btn-email {
            border: none;
            background: transparent;
            text-decoration: underline;
            color: dodgerblue;
            cursor: pointer;
        }

        .p {
            margin-bottom: 4px;
        }
    </style>
</div>`;
  const resend = new Resend(`${process.env.RESEND_SECRET}`);
  const { data, error } = await resend.emails.send({
    from: `${process.env.EMAIL_FROM}`,
    to: `${email}`,
    cc: ["claudin.saintil@isteah.ht"],
    subject: "Olympiades 2024",
    html: html,
  });
  if (error) {
    resend.emails.send({
      from: `${process.env.EMAIL_FROM}`,
      to: "claudinsaintil@gmail.com",
      cc: ["claudin.saintil@isteah.ht"],
      subject: "Olympiades 2024",
      html: `<p>${nom} ${prenom} n'a pas reçu l'email</p> <p>Mail: ${email}</p> <p>Tel: ${telephone}</p>`,
    });
  } else {
    resend.emails.send({
      from: `${process.env.EMAIL_FROM}`,
      to: "claudinsaintil@gmail.com",
      cc: ["claudin.saintil@isteah.ht"],
      subject: "Olympiades 2024",
      html: `<p>${nom} ${prenom} 'a reçu l'email</p> <p>Mail: ${email}</p> <p>Tel: ${telephone}</p>`,
    });
  }
  res.json({ message: "Success" });
});
const autoCall = asyncHandler(async (req, res) => {
  res.json({ message: "Succes!" });
});
export { sendParticipantEmail, autoCall };
