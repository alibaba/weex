package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.TreeMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Video_Video_Src extends TestFlow {
	public AG_Video_Video_Src() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		TreeMap testMap = new <String, Object> TreeMap();
		testMap.put("testComponet", "AG_Video");
		testMap.put("testChildCaseInit", "AG_Video_Video_Src");
		testMap.put("step1",new TreeMap(){
			{
				put("click", "src0");
				put("screenshot", "AG_Video_Video_Src_01_src0");
			}
		});
		testMap.put("step2",new TreeMap(){
			{
				put("click", "src1");
				put("screenshot", "AG_Video_Video_Src_02_src1");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
