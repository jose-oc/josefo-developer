---
title: Implement statistics on your Java project
date: 2014-10-12T22:32:07+00:00

---
<p style="text-align: justify">
  It is so easy!
</p>

<p style="text-align: justify">
  I love data analysis and I think every own product should be able to analyze through statistics in order to have enough data to make the right decision about his or her business. For this reason I decided to implement a desk of statistics on one of my projects, this project has been running for years so it has many data.
</p>

<p style="text-align: justify">
  I developed this project on Java and it's running on Apache Tomcat 7. A few months ago I developed statistics and I gave the results on tables but every one likes to see the data on charts so I decided to implement it. I decided to use for this porpuse <span class="lang:default highlight:0 decode:true  crayon-inline">PrimeFaces</span>, a component library for <span class="lang:default highlight:0 decode:true  crayon-inline">JSF</span>. Here I'll tell you how easy was this process and how happy the users were.
</p>

<h2 style="text-align: justify">
  First. Add this technology to your project
</h2>

<p style="text-align: justify">
  Adding this technology to my project was really easy, I just copied the jar files to the lib directory of my project (I don't use maven on this project).
</p>

<p style="text-align: justify">
  First of all I decided to use the Apache implementation of JSF: <strong>myfaces</strong>. I added these jar files to my project:
</p>

<ul style="text-align: justify">
  <li style="text-align: justify">
    myfaces-api-2.2.5.jar
  </li>
  <li style="text-align: justify">
    myfaces-bundle-2.2.5.jar
  </li>
  <li style="text-align: justify">
    myfaces-impl-2.2.5.jar
  </li>
</ul>

<p style="text-align: justify">
  And its dependencies:
</p>

<ul style="text-align: justify">
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
</ul>

<p style="text-align: justify">
  To be able to use <strong>PrimeFaces</strong> I added this jar:
</p>

<ul style="text-align: justify">
  <li>
    primefaces-5.1.jar
  </li>
</ul>

<h2 style="text-align: justify">
  Configure the project to use JSF
</h2>

<p style="text-align: justify">
  Write these lines in the web.xml file:
</p>


```xml
  <!--
     Current project stage. When it is set to 'Development' Primefaces give a lot of debug information on the screen.
   -->
   <context-param>
       <param-name>javax.faces.PROJECT_STAGE</param-name>
       <param-value>Development</param-value>
   </context-param>

   <!-- Staring JSF -->
   <servlet>
       <servlet-name>Faces Servlet</servlet-name>
       <servlet-class>javax.faces.webapp.FacesServlet</servlet-class>
       <load-on-startup>1</load-on-startup>
   </servlet>

   <!-- JSF URL mapping -->
   <servlet-mapping>
       <servlet-name>Faces Servlet</servlet-name>
       <url-pattern>*.xhtml</url-pattern>
   </servlet-mapping>
```

<p style="text-align: justify">
  This way when the URL finishes in .xhtml the JSF servlet will work.
</p>

<h2 style="text-align: justify">
  Using JSF
</h2>

<p style="text-align: justify">
  Let's test if JSF works on the project. We will create a file with xhtml extension like this:
</p>

```html
<!DOCTYPE html>
<html xmlns="http://www.w3c.org/1999/xhtml"
       xmlns:h="http://xmlns.jcp.org/jsf/html">
 <h:head></h:head>
 <h:body>
    Hello world!
 </h:body>
</html>
```

<p style="text-align: justify">
  This file will write the html tag <head> using the JSF tag <span class="lang:default highlight:0 decode:true  crayon-inline ">h:head</span>.
</p>

<p style="text-align: justify">
  Until now we haven't use PrimeFaces, let's see an example to test if PrimeFaces works in the project. This file should draw a rich editor in your browser.
</p>

```html
<!DOCTYPE html>
<html xmlns="http://www.w3c.org/1999/xhtml"
       xmlns:h="http://xmlns.jcp.org/jsf/html"
       xmlns:p="http://primefaces.org/ui">
 <h:head></h:head>
 <h:body>
       <p:editor />
 </h:body>
</html>
```

<h2 style="text-align: justify">
  Working on the statistics
</h2>

<p style="text-align: justify">
  If JSF and PrimeFaces are already working we can work on our goal. I'll show you how easy is to create a chart to represent your data.
</p>

<h3 style="text-align: justify">
  The view
</h3>

<p style="text-align: justify">
  I'll start creating the view. It's surprising that writing just one line we will have a chart.
</p>

```html
<html xmlns="http://www.w3.org/1999/xhtml" 
    xmlns:h="http://java.sun.com/jsf/html" 
    xmlns:f="http://java.sun.com/jsf/core" 
    xmlns:p="http://primefaces.org/ui"> 

    <h:head> 
    </h:head> 

    <h:body>      

    <p:chart type="bar" model="#{rankingProduct.rankingClientesModel}" style="height:300px"/>

    </h:body> 
</html>
```

<p style="text-align: justify">
  The tag <span class="lang:default highlight:0 decode:true  crayon-inline "><p:chart /></span>  makes PrimeFaces to draw a chart and with <span class="lang:default highlight:0 decode:true  crayon-inline ">type=&#8221;bar&#8221;</span> we are saying the type of chart. Giving the data of the chart is very simple: <span class="lang:xhtml highlight:0 decode:true crayon-inline">model=&#8221;#{rankingProduct.rankingClientesModel}&#8221;</span>
</p>

<h3 style="text-align: justify">
  The model
</h3>

<p style="text-align: justify">
  We will create a Java class called RankingProduct. This class will have a private attribute rankingClientesModel with its getter method.
</p>

RankingProduct.java:

```java
package joc.jsf.statistic.beans;

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
```

<p style="text-align: justify">
  For simplicity I just wrote three data where you will fill this bean with data from the SQL query that other class will obtain.
</p>

<p style="text-align: justify">
  You can see an example of this type of chart on the primeFaces page. URL: http://www.primefaces.org/showcase/ui/chart/bar.xhtml
</p>

<h2 style="text-align: justify">
  The JSF magic
</h2>

<p style="text-align: justify">
  To sum up I want you to realise how easy is to draw a chart using PrimeFaces. We've just created two files: the view and the Bean and JSF know how to connect them and how to draw the chart. It's amazing!
</p>

<p style="text-align: justify">
  ¡Bravo!
</p>