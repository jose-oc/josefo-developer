---
title: Añadir estadísticas a tu aplicación web Java
author: Jose OC
type: post
date: 2014-10-12T21:37:10+00:00
url: /blog/anadir-estadisticas-a-tu-aplicacion-web-java/
categories:
  - Coding
  - java
tags:
  - JSF
  - PrimeFaces

---
¡Nada tan sencillo!

<p style="text-align: justify">
  Me gusta el análisis de datos y creo que todos los dueños de productos necesitan poder tener acceso a estadísticas que les den una idea de cómo va su negocio. Sobretodo cuando una aplicación tiene un recorrido de ciertos años y la empresa está en un periodo de madurez es muy necesario tener herramientas que permitan hacer un análisis del histórico y así poder tomar decisiones con mejor criterio. Fue por ello que me decidí a añadir un módulo estadístico a un proyecto ya maduro, con varios años de funcionamiento y por tanto, con datos de varios años.
</p>

<p style="text-align: justify">
  El proyecto está desarrollado en Java y corre sobre Tomcat 7. Hace varios meses desarrollé unas tablas donde obtener los principales datos estadísticos, pero como una imagen vale más que cientos de números y sobretodo se sacan conclusiones más rápidamente, ahora tocaba pintar estos datos en gráficas.
</p>

<p style="text-align: justify">
  Para esto me decanté por la tecnología <span class="lang:default highlight:0 decode:true  crayon-inline ">PrimeFaces</span> , una librería de componentes para <span class="lang:default highlight:0 decode:true  crayon-inline">JSF</span>. En este post les cuento lo fácil que resultó desarrollar estas estadísticas (y lo contentos que quedan los usuarios).
</p>

<h2 style="text-align: justify">
  Añadir la tecnología al proyecto
</h2>

<p style="text-align: justify">
  Añadir esta tecnología a mi proyecto fue muy fácil: tan sólo copié los siguientes jar en el directorio lib del proyecto (no uso maven en este proyecto). Lo primero es decidir qué implementación de <strong>JSF</strong> queremos, en mi caso opté por la de apache: <strong>myfaces</strong>. Los jar que tuve que añadir fueron:
</p>

<li style="text-align: justify">
  myfaces-api-2.2.5.jar
</li>
<li style="text-align: justify">
  myfaces-bundle-2.2.5.jar
</li>
<li style="text-align: justify">
  myfaces-impl-2.2.5.jar
</li>

Y sus dependencias:

<li style="text-align: justify">
  commons-beanutils-1.8.3.jar
</li>
<li style="text-align: justify">
  commons-codec-1.3.jar
</li>
<li style="text-align: justify">
  commons-collections-3.2.jar
</li>
<li style="text-align: justify">
  commons-digester-1.8.jar
</li>
<li style="text-align: justify">
  commons-logging-1.1.1.jar
</li>
<li style="text-align: justify">
  geronimo-atinject_1.0_spec-1.0.jar
</li>

Y para poder usar **PrimeFaces** sólo tuve que añadir este jar:

  * primefaces-5.1.jar

## Configurar el proyecto para usar JSF

Para hacer uso de JSF tan sólo hay que indicar qué tipo de URLs deben hacer uso del servlet de JSF, así de sencillo. En el archivo web.xml añadir lo siguiente:

<pre class="lang:xhtml decode:true" title="web.xml">&lt;!--
     Current project stage. When it is set to 'Development' Primefaces give a lot of debug information on the screen.
   --&gt;
   &lt;context-param&gt;
       &lt;param-name&gt;javax.faces.PROJECT_STAGE&lt;/param-name&gt;
       &lt;param-value&gt;Development&lt;/param-value&gt;
   &lt;/context-param&gt;

   &lt;!-- Staring JSF --&gt;
   &lt;servlet&gt;
       &lt;servlet-name&gt;Faces Servlet&lt;/servlet-name&gt;
       &lt;servlet-class&gt;javax.faces.webapp.FacesServlet&lt;/servlet-class&gt;
       &lt;load-on-startup&gt;1&lt;/load-on-startup&gt;
   &lt;/servlet&gt;

   &lt;!-- JSF URL mapping --&gt;
   &lt;servlet-mapping&gt;
       &lt;servlet-name&gt;Faces Servlet&lt;/servlet-name&gt;
       &lt;url-pattern&gt;*.xhtml&lt;/url-pattern&gt;
   &lt;/servlet-mapping&gt;
</pre>

De esta forma cuando se invoque una URL terminada en .xhtml se invocará al servlet de JSF y podremos hacer uso de esta tecnología.

## Utilizando JSF

Para hacer uso de componentes JSF tan sólo tendremos tendremos que crear un archivo con extensión xhtml (si el web.xml lo definimos como se indicó anteriormente). En este archivo se debe indicar que se van a usar tags de JSF indicando la URL. El ejemplo más básico puede ser éste:

<pre class="lang:xhtml decode:true ">&lt;!DOCTYPE html&gt;
&lt;html xmlns="http://www.w3c.org/1999/xhtml"
       xmlns:h="http://xmlns.jcp.org/jsf/html"&gt;
 &lt;h:head&gt;&lt;/h:head&gt;
 &lt;h:body&gt;
    Hello world!
 &lt;/h:body&gt;
&lt;/html&gt;</pre>

Aquí vemos que para escribir la etiqueta de html <head> se usa <span class="lang:default highlight:0 decode:true  crayon-inline ">h:head</span>.

Hasta ahora no hemos usando nada de PrimeFaces. Veamos el ejemplo que ellos mismos nos dan en su documentación, añadamos el componente editor que pinta en pantalla un editor enriquecido, ya sabes, para poder escribir con formato: negritas, cursivas, etc.

<pre class="lang:xhtml mark:4,7 decode:true ">&lt;!DOCTYPE html&gt;
&lt;html xmlns="http://www.w3c.org/1999/xhtml"
       xmlns:h="http://xmlns.jcp.org/jsf/html"
       xmlns:p="http://primefaces.org/ui"&gt;
 &lt;h:head&gt;&lt;/h:head&gt;
 &lt;h:body&gt;
       &lt;p:editor /&gt;
 &lt;/h:body&gt;
&lt;/html&gt;</pre>

##  Generando estadísticas

Hasta ahora todo lo que hemos hecho ha sido añadir la tecnología JSF y PrimeFaces a nuestro proyecto y comprobar que funciona. Ahora crearemos los archivos que necesitamos para pintar una de nuestras estadísticas, para que veáis lo sencillo que es.

### La vista

Empezaré por la vista. Es sorprende lo poco que hay que escribir para generar una gráfica de barras, vean, vean:

<pre class="lang:xhtml mark:11 decode:true" title="stat_bar_ranking_clients.xhtml">&lt;html xmlns="http://www.w3.org/1999/xhtml" 
    xmlns:h="http://java.sun.com/jsf/html" 
    xmlns:f="http://java.sun.com/jsf/core" 
    xmlns:p="http://primefaces.org/ui"&gt; 

    &lt;h:head&gt; 
    &lt;/h:head&gt; 

    &lt;h:body&gt;      

    &lt;p:chart type="bar" model="#{rankingProduct.rankingClientesModel}" style="height:300px"/&gt;

    &lt;/h:body&gt; 
&lt;/html&gt;
</pre>

Fíjate que simplemente con <span class="lang:default highlight:0 decode:true  crayon-inline "><p:chart /></span>  indicamos a PrimeFaces que pinte una gráfica, le indicamos el tipo: <span class="lang:default highlight:0 decode:true  crayon-inline ">type=&#8221;bar&#8221;</span>  y le damos el objeto que tiene los datos a pintar: <span class="lang:xhtml highlight:0 decode:true crayon-inline">model=&#8221;#{rankingProduct.rankingClientesModel}&#8221;</span>

### El modelo

En la vista anterior se indicaba el modelo a pintar. Definámoslo.

Creamos una clase que se llame RankingProduct (podría llamarse de otra forma, pero para qué) en el paquete que nos convenga. Esta clase tendrá un atributo privado que se llame rankingClientesModel con su método get para leerlo (muy importante esto, que no se te olvide el método get).

<pre class="lang:java decode:true " title="RankingProduct.java">package joc.jsf.statistic.beans;

import java.io.Serializable;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;

import org.primefaces.model.chart.Axis;
import org.primefaces.model.chart.AxisType;
import org.primefaces.model.chart.BarChartModel;
import org.primefaces.model.chart.ChartSeries;

@ManagedBean(name="rankingProduct")
public class RankigProduct implements Serializable {

    private BarChartModel rankingClientesModel;

    public BarChartModel getRankingClientesModel() {
        return rankingClientesModel;
    }

    @PostConstruct
    public void init() {
        createBarModels();
    }

    private void createBarModels() {
        createRankingClientesModel();
    }

    private void createRankingClientesModel() {
        rankingClientesModel = new BarChartModel();
        rankingClientesModel.setTitle("Ranking of Clients");
        rankingClientesModel.setLegendPosition("ne");

        // Set the data: will be obtained from DB
        ChartSeries totalProductos = new ChartSeries();
        totalProductos.setLabel("Products");
        totalProductos.set("Client 01", 50);
        totalProductos.set("Client 02", 250);
        totalProductos.set("Client 03", 150);

        rankingClientesModel.addSeries(totalProductos);

        Axis xAxis = rankingClientesModel.getAxis(AxisType.X);
        xAxis.setLabel("Clients");

        Axis yAxis = rankingClientesModel.getAxis(AxisType.Y);
        yAxis.setLabel("Sales");
        yAxis.setMin(0);
        yAxis.setMax(400);
    }

}
</pre>

En este caso se han añadido datos simplemente para pintar algo en la gráfica, en realidad se carga este bean con los datos resultados de la consulta a base de datos que lleva a cabo otra clase.

Para ver un ejemplo de cómo es esta gráfica, que puedes interactuar con ella y ya de paso ver más cosas que puedes hacer con PrimeFaces, visita esta URL: <http://www.primefaces.org/showcase/ui/chart/bar.xhtml>

## La magia JSF

Para resumir quiero que te des cuenta de lo fácil que ha sido pintar la gráfica. Simplemente hemos creado una vista donde a primeFaces le hemos dicho que pinte una gráfica y que tome los datos de un bean. Luego hemos creado dicho bean y lo hemos llenado con datos, nada más. La &#8220;magia JSF&#8221; ha sido quien se ha encargado de darle el bean a la vista y de pintar la gráfica.

¡Qué fácil!