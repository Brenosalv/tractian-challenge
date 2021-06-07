import { FC } from 'react';
import {
  Card,
  Empty,
  Image,
  Upload,
  Button,
  Descriptions,
  Badge,
  List,
} from 'antd';

import Content from '../components/Content';
import Header from '../components/Header';

import { AssetsData } from '../../contexts/AssetsContext';

import '../../styles/pages/global.css';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import EditableText from '../components/EditableText';
import moment from 'moment';
require('highcharts/modules/exporting')(Highcharts);

moment.locale("pt-br");

const Assets: FC = () => {
  const { Meta } = Card;

  const handleImageChange = (asset: AssetsData) => (data: object) => {
    const newAssetImage = { "image": data }
    axios.put(`https://my-json-server.typicode.com/tractian/fake-api/assets/${asset.id}`, newAssetImage)
  }

  const unitName = sessionStorage.getItem("unitName");
  const unitAssets: AssetsData[] = JSON.parse(sessionStorage.getItem("unitAssets")!)

  return (
    <div className="container">
      <Header />

      <main>
        <Content title={`${unitName} - Ativos`}>
          {unitAssets.length === 0 ? (
            <div className="empty-container">
              <Empty description="Não há ativos registrados." />
            </div>
          ) : (
            <div className="site-card-wrapper">
              {unitAssets.map((asset) => (
                <Card
                  key={asset.id}
                  cover={
                    <>
                      <Image
                        className="asset-img"
                        src={asset.image}
                      />
                      <Upload
                        multiple={false}
                        showUploadList={false}
                        method="PUT"
                        onChange={handleImageChange(asset)}
                      >
                        <Button type="link">Trocar imagem</Button>
                      </Upload>
                    </>
                  }
                >
                  <Meta
                    className="asset-info"
                    title={
                      <div id="asset-title">
                        <img
                          alt="Ativo"
                          src="asset.svg"
                          width="32rem"
                        />

                        <EditableText text={asset.name} type="nome do ativo" />
                      </div>
                    }
                    description={
                      <div>
                        <Descriptions
                          layout="vertical"
                          column={1}
                          labelStyle={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center"
                          }}
                          contentStyle={{
                            padding: "4px 12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center"
                          }}
                          title="" bordered
                        >
                          <Descriptions.Item label="Modelo">
                            <EditableText text={asset.model} type="modelo" />
                          </Descriptions.Item>

                          <Descriptions.Item label="Sensor(es)">
                            <EditableText text={asset.sensors} type="nome do(s) sensor(es)" />
                          </Descriptions.Item>

                          <Descriptions.Item label="Especificações">
                            <List>
                              {asset.specifications.maxTemp ? (
                                <List.Item className="asset-data">
                                  Temperatura máxima (°C):
                                  <EditableText text={asset.specifications.maxTemp} type="temperatura máxima" />
                                </List.Item>
                              ) : <></>}

                              {asset.specifications.rpm ? (
                                <List.Item className="asset-data">
                                  RPM:
                                  <EditableText text={asset.specifications.rpm} type="RPM" />
                                </List.Item>
                              ) : <></>}

                              {asset.specifications.power >= 0 ? (
                                <List.Item className="asset-data">
                                  Potência (kW):
                                  <EditableText text={asset.specifications.power} type="potência" />
                                </List.Item>
                              ) : <></>}
                            </List>
                          </Descriptions.Item>

                          <Descriptions.Item label="Último momento em atividade">
                            Data: {moment.utc(asset.metrics.lastUptimeAt).local().format('DD/MM/YYYY')}
                            <br />
                            Horário: {moment.utc(asset.metrics.lastUptimeAt).local().format('HH:mm:ss')}
                          </Descriptions.Item>

                          <Descriptions.Item label="Status">
                            <Badge status={
                              asset.status === "inOperation" ? "processing" :
                                asset.status === "inDowntime" ? "default" :
                                  asset.status === "inAlert" ? "error" : "default"
                            } text={
                              asset.status === "inOperation" ? "Em atividade" :
                                asset.status === "inDowntime" ? "Inativo" :
                                  asset.status === "inAlert" ? "Em alerta" : "default"
                            } />
                          </Descriptions.Item>
                        </Descriptions>

                        <HighchartsReact
                          highcharts={Highcharts}
                          /* Below, I considered "allowChartUpdate={false}" because the data is being 
                          fetched from a static fake API, so there is no new data being captured 
                          by the system. In a real case where the system is fed by new asset data in real time, 
                          I would consider updating continuously the chart. */
                          allowChartUpdate={false}
                          containerProps={{
                            style: { margin: '48px 0' }
                          }}
                          options={{
                            exporting: {
                              enabled: true
                            },
                            navigation: {
                              buttonOptions: {
                                align: 'right',
                                verticalAlign: 'top',
                                x: 4,
                                y: -4
                              }
                            },
                            credits: {
                              enabled: false
                            },
                            chart: {
                              type: 'column',
                              style: {
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 600,
                              },
                              spacing: 18,

                            },
                            title: {
                              text: `Gráfico do ${asset.name}`,
                              style: {
                                overflowWrap: "break-word"
                              }
                            },
                            xAxis: {
                              categories: [
                                'Atributos',
                              ],
                              crosshair: true,
                            },
                            yAxis: {
                              title: {
                                text: 'Nível'
                              },
                              type: 'logarithmic',
                            },
                            series: [{
                              name: 'Saúde (%)',
                              data: [asset.healthscore]
                            }, {
                              name: 'Tempo total de atividade (h)',
                              data: [Math.round(asset.metrics.totalUptime * 100) / 100],
                            },
                            {
                              name: 'Total de coletas em tempo de atividade',
                              data: [asset.metrics.totalCollectsUptime],
                              style: {
                                overflowWrap: "break-word"
                              }
                            }],
                            tooltip: {
                              backgroundColor: '#FCFFC5',
                              borderRadius: 8,
                              borderWidth: 2,
                              style: {
                                width: "fit-content"
                              }
                            }
                          }}
                        />
                      </div>
                    }
                  />
                </Card>
              ))}
            </div>
          )}
        </Content>
      </main>
    </div >
  );
}

export default Assets;