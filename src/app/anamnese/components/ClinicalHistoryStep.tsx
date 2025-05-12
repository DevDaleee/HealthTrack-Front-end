import { Check, FileText, HeartPulse, User } from 'lucide-react';

interface Props {
  formData: any;
  onChange: (e: React.ChangeEvent<any>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ClinicalHistoryStep({
  formData,
  onChange,
  onNext,
  onPrev,
}: Props) {
  return (
    <div className="justify-center p-10">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <HeartPulse className="mr-2" /> História Clínica
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <label className="mr-2">Doenças Diagnosticadas:</label>
          <select
            name="diagnosedDiseases"
            value={formData.diagnosedDiseases}
            onChange={onChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
        </div>
        {formData.diagnosedDiseases === 'sim' && (
          <input
            type="text"
            name="diagnosedDiseasesDetails"
            placeholder="Detalhes das Doenças"
            value={formData.diagnosedDiseasesDetails}
            onChange={onChange}
            className="w-full p-2 border rounded"
          />
        )}
        <div className="flex items-center">
          <label className="mr-2">Medicamentos:</label>
          <select
            name="medications"
            value={formData.medications}
            onChange={onChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
        </div>
        {formData.medications === 'sim' && (
          <input
            type="text"
            name="medicationsDetails"
            placeholder="Detalhes dos Medicamentos"
            value={formData.medicationsDetails}
            onChange={onChange}
            className="w-full p-2 border rounded"
          />
        )}
        <div>
          <label className="block mb-2">Histórico Familiar de Doenças:</label>
          <div className="flex flex-wrap gap-2">
            {['Diabetes', 'Hipertensão', 'Cardiopatias'].map((disease) => (
              <label key={disease} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="familyDiseaseHistory"
                  value={disease}
                  onChange={onChange}
                  className="mr-2"
                />
                {disease}
              </label>
            ))}
            <input
              type="text"
              name="otherFamilyDiseases"
              placeholder="Outros"
              value={formData.otherFamilyDiseases || ''}
              onChange={onChange}
              className="mt-2 w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="flex items-center">
          <label className="mr-2">Vacinação em dia:</label>
          <select
            name="vaccination"
            value={formData.vaccination}
            onChange={onChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
        </div>
        {formData.vaccination === 'sim' && (
          <input
            type="text"
            name="vaccinationDetails"
            placeholder="Quais vacinas?"
            value={formData.vaccinationDetails}
            onChange={onChange}
            className="w-full p-2 border rounded"
          />
        )}
        <div className="flex items-center">
          <label className="mr-2">Doenças anteriores deixaram sequelas:</label>
          <select
            name="previousDiseaseSequelae"
            value={formData.previousDiseaseSequelae}
            onChange={onChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
        </div>
        {formData.previousDiseaseSequelae === 'sim' && (
          <input
            type="text"
            name="previousDiseaseSequelaeDetails"
            placeholder="Quais sequelas?"
            value={formData.previousDiseaseSequelaeDetails}
            onChange={onChange}
            className="w-full p-2 border rounded"
          />
        )}
        <div className="flex items-center">
          <label className="mr-2">Acidentes deixaram sequelas:</label>
          <select
            name="accidents"
            value={formData.accidents}
            onChange={onChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
        </div>
        {formData.accidents === 'sim' && (
          <input
            type="text"
            name="accidentSequelae"
            placeholder="Quais sequelas?"
            value={formData.accidentSequelae}
            onChange={onChange}
            className="w-full p-2 border rounded"
          />
        )}
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Revisão de Sistemas</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Capacidade Cognitiva:</label>
          <select
            name="cognitiveCapacity"
            value={formData.cognitiveCapacity}
            onChange={onChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione</option>
            <option value="boa">Boa</option>
            <option value="regular">Regular</option>
            <option value="ruim">Ruim</option>
          </select>
          {formData.cognitiveCapacity &&
            formData.cognitiveCapacity !== 'boa' && (
              <input
                type="text"
                name="cognitiveCapacityReason"
                placeholder="Por quê?"
                value={formData.cognitiveCapacityReason}
                onChange={onChange}
                className="w-full p-2 border rounded mt-2"
              />
            )}
        </div>
        <div>
          <label className="block mb-2">Estado Emocional:</label>
          <select
            name="emotionalState"
            value={formData.emotionalState}
            onChange={onChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione</option>
            <option value="bom">Bom</option>
            <option value="regular">Regular</option>
            <option value="ruim">Ruim</option>
          </select>
          {formData.emotionalState && formData.emotionalState !== 'bom' && (
            <input
              type="text"
              name="emotionalStateReason"
              placeholder="Por quê?"
              value={formData.emotionalStateReason}
              onChange={onChange}
              className="w-full p-2 border rounded mt-2"
            />
          )}
        </div>
        <div className="flex items-center">
          <label className="mr-2">Em tratamento:</label>
          <select
            name="currentTreatment"
            value={formData.currentTreatment}
            onChange={onChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
        </div>
        {formData.currentTreatment === 'sim' && (
          <input
            type="text"
            name="treatmentDetails"
            placeholder="Qual tratamento?"
            value={formData.treatmentDetails}
            onChange={onChange}
            className="w-full p-2 border rounded"
          />
        )}
        <div>
          <label className="block mb-2">Autonomia:</label>
          <select
            name="autonomy"
            value={formData.autonomy}
            onChange={onChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione</option>
            <option value="boa">Boa</option>
            <option value="regular">Regular</option>
            <option value="ruim">Ruim</option>
          </select>
          {formData.autonomy && formData.autonomy !== 'boa' && (
            <input
              type="text"
              name="autonomyReason"
              placeholder="Por quê?"
              value={formData.autonomyReason}
              onChange={onChange}
              className="w-full p-2 border rounded mt-2"
            />
          )}
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onPrev}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Anterior
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 flex items-center"
        >
          <Check className="mr-2" /> Enviar
        </button>
      </div>
    </div>
  );
}
