import { User } from 'lucide-react';

interface Props {
  formData: any;
  onChange: (e: React.ChangeEvent<any>) => void;
  onNext: () => void;
}

export default function DemographicStep({ formData, onChange, onNext }: Props) {
  return (
    <div className="justify-center p-10 w-[1500px] h-[500px]">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <User className="mr-2" /> Informações Demográficas
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="birthDate"
          placeholder="Data de Nascimento"
          value={formData.birthDate}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contato"
          value={formData.contact}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="sex"
          value={formData.sex}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Selecione o Sexo</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
        <input
          type="text"
          name="ethnicity"
          placeholder="Etnia"
          value={formData.ethnicity}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="occupation"
          placeholder="Ocupação"
          value={formData.occupation}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <textarea
        name="assistanceReason"
        placeholder="Motivo da Assistência Nutricional"
        value={formData.assistanceReason}
        onChange={onChange}
        className="w-full p-2 border rounded mt-4"
        rows={3}
      />
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={onNext}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
