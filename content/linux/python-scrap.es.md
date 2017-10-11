---
title: Scraping with python, preparing environment
author: Jose OC
type: post
date: -001-11-30T00:00:00+00:00
draft: true
url: /?p=223
categories:
  - Coding

---
I&#8217;ve installed my Ubuntu on a VirtualBox. Just after that I installed the

python &#8211;version

2.7.6

Instalar pip

wget <https://bootstrap.pypa.io/get-pip.py>

sudo python get-pip.py

Successfully installed pip-6.0.8 setuptools-12.1

&nbsp;

<pre class="lang-py prettyprint prettyprinted"><code>&lt;span class="pln">sudo apt&lt;/span>&lt;span class="pun">-&lt;/span>&lt;span class="pln">get install libxml2&lt;/span>&lt;span class="pun">-&lt;/span>&lt;span class="pln">dev libxslt1&lt;/span>&lt;span class="pun">-&lt;/span>&lt;span class="pln">dev python&lt;/span>&lt;span class="pun">-&lt;/span>&lt;span class="pln">dev

&lt;/span></code></pre>

jose@jose-VirtualBox:~$ sudo -H pip install lxml Requirement already satisfied (use &#8211;upgrade to upgrade): lxml in /usr/lib/python2.7/dist-packages

&nbsp;

&nbsp;

Instalando Scrapy

jose@jose-VirtualBox:~$ sudo -H pip install Scrapy Collecting Scrapy Downloading Scrapy-0.24.4-py2-none-any.whl (444kB) 100% |################################| 446kB 383kB/s Collecting cssselect>=0.9 (from Scrapy) Downloading cssselect-0.9.1.tar.gz Collecting queuelib (from Scrapy) Downloading queuelib-1.2.2-py2.py3-none-any.whl Requirement already satisfied (use &#8211;upgrade to upgrade): pyOpenSSL in /usr/lib/python2.7/dist-packages (from Scrapy) Collecting w3lib>=1.8.0 (from Scrapy) Downloading w3lib-1.11.0-py2.py3-none-any.whl Requirement already satisfied (use &#8211;upgrade to upgrade): lxml in /usr/lib/python2.7/dist-packages (from Scrapy) Collecting Twisted>=10.0.0 (from Scrapy) Downloading Twisted-15.0.0.tar.bz2 (4.4MB) 100% |################################| 4.4MB 100kB/s Requirement already satisfied (use &#8211;upgrade to upgrade): six>=1.5.2 in /usr/lib/python2.7/dist-packages (from Scrapy) Requirement already satisfied (use &#8211;upgrade to upgrade): zope.interface>=3.6.0 in /usr/lib/python2.7/dist-packages (from Twisted>=10.0.0->Scrapy) Installing collected packages: Twisted, w3lib, queuelib, cssselect, Scrapy Running setup.py install for Twisted x86\_64-linux-gnu-gcc -pthread -fno-strict-aliasing -DNDEBUG -g -fwrapv -O2 -Wall -Wstrict-prototypes -fPIC -I/usr/include/python2.7 -c conftest.c -o conftest.o building &#8216;twisted.runner.portmap&#8217; extension x86\_64-linux-gnu-gcc -pthread -fno-strict-aliasing -DNDEBUG -g -fwrapv -O2 -Wall -Wstrict-prototypes -fPIC -I/usr/include/python2.7 -c twisted/runner/portmap.c -o build/temp.linux-x86\_64-2.7/twisted/runner/portmap.o x86\_64-linux-gnu-gcc -pthread -shared -Wl,-O1 -Wl,-Bsymbolic-functions -Wl,-Bsymbolic-functions -Wl,-z,relro -fno-strict-aliasing -DNDEBUG -g -fwrapv -O2 -Wall -Wstrict-prototypes -D\_FORTIFY\_SOURCE=2 -g -fstack-protector &#8211;param=ssp-buffer-size=4 -Wformat -Werror=format-security build/temp.linux-x86\_64-2.7/twisted/runner/portmap.o -o build/lib.linux-x86\_64-2.7/twisted/runner/portmap.so building &#8216;twisted.test.raiser&#8217; extension x86\_64-linux-gnu-gcc -pthread -fno-strict-aliasing -DNDEBUG -g -fwrapv -O2 -Wall -Wstrict-prototypes -fPIC -I/usr/include/python2.7 -c twisted/test/raiser.c -o build/temp.linux-x86\_64-2.7/twisted/test/raiser.o x86\_64-linux-gnu-gcc -pthread -shared -Wl,-O1 -Wl,-Bsymbolic-functions -Wl,-Bsymbolic-functions -Wl,-z,relro -fno-strict-aliasing -DNDEBUG -g -fwrapv -O2 -Wall -Wstrict-prototypes -D\_FORTIFY\_SOURCE=2 -g -fstack-protector &#8211;param=ssp-buffer-size=4 -Wformat -Werror=format-security build/temp.linux-x86\_64-2.7/twisted/test/raiser.o -o build/lib.linux-x86\_64-2.7/twisted/test/raiser.so building &#8216;twisted.python.sendmsg&#8217; extension x86\_64-linux-gnu-gcc -pthread -fno-strict-aliasing -DNDEBUG -g -fwrapv -O2 -Wall -Wstrict-prototypes -fPIC -I/usr/include/python2.7 -c twisted/python/sendmsg.c -o build/temp.linux-x86\_64-2.7/twisted/python/sendmsg.o x86\_64-linux-gnu-gcc -pthread -shared -Wl,-O1 -Wl,-Bsymbolic-functions -Wl,-Bsymbolic-functions -Wl,-z,relro -fno-strict-aliasing -DNDEBUG -g -fwrapv -O2 -Wall -Wstrict-prototypes -D\_FORTIFY\_SOURCE=2 -g -fstack-protector &#8211;param=ssp-buffer-size=4 -Wformat -Werror=format-security build/temp.linux-x86\_64-2.7/twisted/python/sendmsg.o -o build/lib.linux-x86\_64-2.7/twisted/python/sendmsg.so changing mode of build/scripts-2.7/twistd from 644 to 755 changing mode of build/scripts-2.7/tap2deb from 644 to 755 changing mode of build/scripts-2.7/pyhtmlizer from 644 to 755 changing mode of build/scripts-2.7/trial from 644 to 755 changing mode of build/scripts-2.7/tapconvert from 644 to 755 changing mode of build/scripts-2.7/manhole from 644 to 755 changing mode of build/scripts-2.7/tap2rpm from 644 to 755 changing mode of build/scripts-2.7/mailmail from 644 to 755 changing mode of build/scripts-2.7/ckeygen from 644 to 755 changing mode of build/scripts-2.7/conch from 644 to 755 changing mode of build/scripts-2.7/cftp from 644 to 755 changing mode of build/scripts-2.7/tkconch from 644 to 755 changing mode of build/scripts-2.7/lore from 644 to 755 changing mode of /usr/local/bin/twistd to 755 changing mode of /usr/local/bin/ckeygen to 755 changing mode of /usr/local/bin/tap2deb to 755 changing mode of /usr/local/bin/pyhtmlizer to 755 changing mode of /usr/local/bin/conch to 755 changing mode of /usr/local/bin/trial to 755 changing mode of /usr/local/bin/tapconvert to 755 changing mode of /usr/local/bin/cftp to 755 changing mode of /usr/local/bin/manhole to 755 changing mode of /usr/local/bin/tkconch to 755 changing mode of /usr/local/bin/lore to 755 changing mode of /usr/local/bin/tap2rpm to 755 changing mode of /usr/local/bin/mailmail to 755

Running setup.py install for cssselect

Successfully installed Scrapy-0.24.4 Twisted-15.0.0 cssselect-0.9.1 queuelib-1.2.2 w3lib-1.11.0

&nbsp;